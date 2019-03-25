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
    }

    enum Status {Commited, Paid, Revealed, Exited, Declined}

    Vuln[] public vulns;

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

    // TODO: Decide what to do with this constructor
    constructor() public {
    }

    function commit(
        IExploitable exploitable
    ) public returns (uint256 id) {
        require(exploitable.implementsExploitable());

        id = vulns.push(Vuln({
            exploitable: exploitable,
            attacker: msg.sender,
            key: "",
            bounty: 0,
            plain: "",
            encrypted: "",
            status: Status.Commited,
            reason: ""
        })) - 1;
        emit Commit(id, address(exploitable), msg.sender);
    }

    function reveal(
        uint256 id,
        string memory plain,
        string memory encrypted
    ) public {
        Vuln storage vuln = vulns[id];
        require(vuln.status == Status.Paid);
        require(msg.sender == vuln.attacker);

        vuln.plain = plain;
        vuln.encrypted = encrypted;
        vuln.status = Status.Revealed;
        emit Reveal(id, plain, encrypted);
    }

    function pay(uint256 id, string memory key) public payable {
        Vuln storage vuln = vulns[id]; 
        require(msg.sender == address(vuln.exploitable));
        require(vuln.status == Status.Commited);

        vuln.key = key; 
        vuln.bounty = msg.value;
        vuln.status = Status.Paid;
        emit Pay(id, key, msg.value);
    }

    // TODO: Decide should also work after a time out, in case the attacker
    //       never reveals a secret
    function decide(uint256 id, bool exit, string memory reason) public {
        Vuln storage vuln = vulns[id];
        require(msg.sender == address(vuln.exploitable));
        require(vuln.status == Status.Revealed);

        if (exit) {
            vuln.status = Status.Exited;
            vuln.reason = reason;
            vuln.exploitable.exit();
            vuln.attacker.send(vuln.bounty);
            emit Decide(id, true);
        } else {
            vuln.status = Status.Declined;
            vuln.reason = reason;
            vuln.exploitable.restore.value(vuln.bounty)();
            vuln.bounty = 0;
            emit Decide(id, false);
        }
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
