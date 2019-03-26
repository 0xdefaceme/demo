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

    enum Status {Commited, Paid, Revealed, Exited, Declined, Timeout}

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
        IExploitable exploitable
    ) public returns (uint256 id) {
        require(
            exploitable.implementsExploitable(),
            "Only exploitable with implementsExploitable can be committed"
        );

        id = vulns.push(Vuln({
            exploitable: exploitable,
            attacker: msg.sender,
            key: "",
            bounty: 0,
            plain: "",
            encrypted: "",
            status: Status.Commited,
            reason: "",
            paidAt: 0
        })) - 1;
        emit Commit(id, address(exploitable), msg.sender);
    }

    function pay(uint256 id, string memory key) public payable {
        Vuln storage vuln = vulns[id]; 
        require(
            msg.sender == address(vuln.exploitable), 
            "Only exploitable can call pay"
        );
        require(
            vuln.status == Status.Commited,
            "Only committed vulns can be paid"
        );

        vuln.key = key; 
        //solium-disable security/no-block-members
        vuln.paidAt = block.timestamp;
        vuln.bounty = msg.value;
        vuln.status = Status.Paid;
        emit Pay(id, key, msg.value);
    }

    function reveal(
        uint256 id,
        string memory plain,
        string memory encrypted
    ) public {
        Vuln storage vuln = vulns[id];
        require(vuln.status == Status.Paid, "Only paid vulns can be revealed");
        require(msg.sender == vuln.attacker, "Only attacker can reveal");

        vuln.plain = plain;
        vuln.encrypted = encrypted;
        vuln.status = Status.Revealed;
        emit Reveal(id, plain, encrypted);
    }

    function decide(uint256 id, bool exit, string memory reason) public {
        Vuln storage vuln = vulns[id];
        require(
            msg.sender == address(vuln.exploitable), 
            "Only exploitable can decide"
        );

        if (timedout(id)) {
            vuln.status = Status.Timeout;
            vuln.reason = "Attacker didn't reveal in time.";
            vuln.exploitable.restore.value(vuln.bounty)();
            vuln.bounty = 0;
            emit Decide(id, false);
        } else if (vuln.status == Status.Revealed) {
            if (exit) {
                vuln.status = Status.Exited;
                vuln.reason = reason;
                vuln.exploitable.exit();
                //solium-disable security/no-send
                vuln.attacker.send(vuln.bounty);
                vuln.bounty = 0;
                emit Decide(id, true);
            } else {
                vuln.status = Status.Declined;
                vuln.reason = reason;
                vuln.exploitable.restore.value(vuln.bounty)();
                vuln.bounty = 0;
                emit Decide(id, false);
            }
        } else {
            revert("Only paid or revealed vulns can be decided");
        }
    }

    function timedout(uint256 id) public view returns (bool) {
        Vuln storage vuln = vulns[id];
        return vuln.status == Status.Paid && 
            vuln.paidAt + timeout > block.timestamp;
    }

    function length() public view returns (uint256) {
        return vulns.length;
    }

    function filter(
        address exploitable
    ) public view returns (uint256[] memory filtered) {
        uint256 count = 0;
        for(uint256 i = 0; i < vulns.length; i++) {
            if (address(vulns[i].exploitable) == exploitable) {
                count++;
            }
        }
        
        filtered = new uint256[](count);
        count = 0;
        
        for (uint256 j = 0; j < vulns.length; j++) {
            if (address(vulns[j].exploitable) == exploitable) {
                filtered[count++] = j;
            }
        }
    }
}
