pragma solidity 0.5.0;

import "./IExploitable.sol";

contract ZeroDay {

    struct Vuln {
        IExploitable exploitable;
        address payable hunter;
        uint256 damage;
        address key;
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
        address indexed key,
        uint256 indexed bounty
    );

    event Decide(
        uint256 indexed id,
        bool indexed exit
    );

    constructor() public {
    }

    function commit(
        IExploitable exploitable,
        uint256 damage
    ) public returns (uint256 id) {
        require(exploitable.implementsZeroDay());
        require(damage <= address(exploitable).balance);

        id = vulns.push(Vuln({
            exploitable: exploitable,
            hunter: msg.sender,
            damage: damage,
            key: address(0),
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
        emit Reveal(id, hash);
    }

    function pay(uint256 id, address key) public payable {
        Vuln storage vuln = vulns[id]; 
        uint256 bounty = vuln.damage * (vuln.exploitable.percentageZeroDay() / 100);
        require(msg.value >= bounty);
        require(msg.sender == address(vuln.exploitable));
        require(vuln.status == Status.Commited);

        vuln.key = key; 
        vuln.bounty = msg.value;
        emit Pay(id, key, msg.value);
    }

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

    function filter(address exploitable) public view returns (uint256[] memory filtered) {
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
