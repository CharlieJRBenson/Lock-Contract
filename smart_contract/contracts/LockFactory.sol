//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Lock.sol";

contract LockFactory{
    mapping(address => Lock[]) locks;

    function getLocks(address _user) public view returns(Lock[] memory){
        return locks[_user];
    }

    function getTimeStamp()public view returns(uint256){
        return block.timestamp;
    }

    function newLock(address payable _owner, uint _lockedFor)payable public{
        //creates new lock
        Lock lock = new Lock(msg.sender, _owner, _lockedFor);
        
        locks[msg.sender].push(lock);

        //if owner is different to msg.sender then add to owner locks[]
        if(msg.sender != _owner){
            locks[_owner].push(lock);
        }

        //send ether connected with this txn to the new contract
        payable(address(lock)).transfer(msg.value);

        //emit creation event
        emit Created(address(lock), msg.sender, _owner, block.timestamp, _lockedFor, msg.value);
    }

    //reverts when accidentally receiving ether
    receive() external payable{
        revert();
    }

    event Created(address lock, address from, address to, uint256 createdAt, uint256 _lockedFor, uint256 amount);
}