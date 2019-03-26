pragma solidity ^0.5.2;

import "./IExploitable.sol";

contract Negotiator {

    struct Vuln {
        IExploitable exploitable;
        address payable attacker;
        string key;
        uint256 bounty;
        string plain;
        string encrypted;
        Status status;
        string reason;
        uint256 paidAt;
    }

    enum Status {Committed, Paid, Revealed, Exited, Declined, Timeout}

    Vuln[] public vulns;
    uint256 public timeout = 1 days;

    event Commit(
        uint256 indexed id,
        address indexed exploitable,
        address attacker
    );

    event Reveal(
        uint256 indexed id,
        string indexed plain,
        string indexed encrypted
    );

    event Pay(
        uint256 indexed id,
        string indexed key,
        uint256 indexed bounty
    );

    event Decide(
        uint256 indexed id,
        bool indexed exit
    );

    function commit(
        IExploitable _exploitable
    ) public returns (uint256 id) {
        require(
            _exploitable.implementsExploitable(),
            "Only exploitable with implementsExploitable can be committed"
        );

        id = vulns.push(Vuln({
            exploitable: _exploitable,
            attacker: msg.sender,
            key: "",
            bounty: 0,
            plain: "",
            encrypted: "",
            status: Status.Committed,
            reason: "",
            paidAt: 0
        })) - 1;
        emit Commit(id, address(_exploitable), msg.sender);
    }

    function pay(uint256 _id, string memory _key) public payable {
        Vuln storage vuln = vulns[_id]; 
        require(
            msg.sender == address(vuln.exploitable), 
            "Only exploitable can call pay"
        );
        require(
            vuln.status == Status.Committed,
            "Only committed vulns can be paid"
        );

        vuln.key = _key; 
        //solium-disable security/no-block-members
        vuln.paidAt = block.timestamp;
        vuln.bounty = msg.value;
        vuln.status = Status.Paid;
        emit Pay(_id, _key, msg.value);
    }

    function reveal(
        uint256 _id,
        string memory _plain,
        string memory _encrypted
    ) public {
        Vuln storage vuln = vulns[_id];
        require(vuln.status == Status.Paid, "Only paid vulns can be revealed");
        require(msg.sender == vuln.attacker, "Only attacker can reveal");

        vuln.plain = _plain;
        vuln.encrypted = _encrypted;
        vuln.status = Status.Revealed;
        emit Reveal(_id, _plain, _encrypted);
    }

    function decide(uint256 _id, bool _exit, string memory _reason) public {
        Vuln storage vuln = vulns[_id];
        require(
            msg.sender == address(vuln.exploitable), 
            "Only exploitable can decide"
        );

        if (timedout(_id)) {
            vuln.status = Status.Timeout;
            vuln.reason = "Attacker didn't reveal in time.";
            vuln.exploitable.restore.value(vuln.bounty)();
            vuln.bounty = 0;
            emit Decide(_id, false);
        } else if (vuln.status == Status.Revealed) {
            if (_exit) {
                vuln.status = Status.Exited;
                vuln.reason = _reason;
                vuln.exploitable.exit();
                //solium-disable security/no-send
                vuln.attacker.send(vuln.bounty);
                vuln.bounty = 0;
                emit Decide(_id, true);
            } else {
                vuln.status = Status.Declined;
                vuln.reason = _reason;
                vuln.exploitable.restore.value(vuln.bounty)();
                vuln.bounty = 0;
                emit Decide(_id, false);
            }
        } else {
            revert("Only paid or revealed vulns can be decided");
        }
    }

    function timedout(uint256 _id) public view returns (bool) {
        Vuln storage vuln = vulns[_id];
        return vuln.status == Status.Paid && 
            vuln.paidAt + timeout > block.timestamp;
    }

    function length() public view returns (uint256) {
        return vulns.length;
    }

    function filter(
        address _exploitable
    ) public view returns (uint256[] memory filtered) {
        uint256 count = 0;
        for(uint256 i = 0; i < vulns.length; i++) {
            if (address(vulns[i].exploitable) == _exploitable) {
                count++;
            }
        }
        
        filtered = new uint256[](count);
        count = 0;
        
        for (uint256 j = 0; j < vulns.length; j++) {
            if (address(vulns[j].exploitable) == _exploitable) {
                filtered[count++] = j;
            }
        }
    }
}
