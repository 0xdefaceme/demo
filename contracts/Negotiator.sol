pragma solidity 0.5.0;

import "./IExploitable.sol";

contract Negotiator {

    struct Vuln {
        IExploitable exploitable;
        address payable hunter;
        uint256 damage;
        string key;
        uint256 bounty;
        string hash;
        Status status;
    }

    enum Status {Commited, Payed, Revealed, Exited, Declined}

    Vuln[] public vulns;

    event Commit(
        uint256 indexed id,
        address indexed exploitable,
        uint256 indexed damage,
        address hunter
    );

    event Reveal(
        uint256 indexed id,
        string indexed hash
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
        IExploitable exploitable,
        uint256 damage
    ) public returns (uint256 id) {
        require(exploitable.implementsEIP1337());
        require(damage <= address(exploitable).balance);

        id = vulns.push(Vuln({
            exploitable: exploitable,
            hunter: msg.sender,
            damage: damage,
            key: "",
            bounty: 0,
            hash: "",
            status: Status.Commited
        })) - 1;
        emit Commit(id, address(exploitable), damage, msg.sender);
    }

    function reveal(uint256 id, string memory hash) public {
        Vuln storage vuln = vulns[id];
        require(vuln.status == Status.Payed);
        require(msg.sender == vuln.hunter);

        vuln.hash = hash;
        vuln.status = Status.Revealed;
        emit Reveal(id, hash);
    }

    function pay(uint256 id, string memory key) public payable {
        Vuln storage vuln = vulns[id]; 
        uint256 bounty = vuln.damage * (vuln.exploitable.percentageEIP1337() / 100);
        require(msg.value >= bounty);
        require(msg.sender == address(vuln.exploitable));
        require(vuln.status == Status.Commited);

        vuln.key = key; 
        vuln.bounty = msg.value;
        vuln.status = Status.Payed;
        emit Pay(id, key, msg.value);
    }

    // TODO: Add string reason
    // TODO: Decide should also work after a time out, in case the attacker
    //       never reveals a secret
    function decide(uint256 id, bool exit) public {
        Vuln storage vuln = vulns[id];
        require(msg.sender == address(vuln.exploitable));
        require(vuln.status == Status.Revealed);

        if (exit) {
            vuln.status = Status.Exited;
            vuln.exploitable.exit();
            vuln.hunter.send(vuln.bounty);
            emit Decide(id, true);
        } else {
            vuln.status = Status.Declined;
            vuln.exploitable.restore.value(vuln.bounty)();
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
