//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Lock{
    address public creator;
    address payable public owner;
    uint256 public unlockDate;
    uint256 public createdAt;   

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor(address _creator, address payable _owner, uint256 _lockedFor) payable{
        creator = _creator;
        owner = _owner;
        unlockDate = block.timestamp + _lockedFor;
        createdAt = block.timestamp;
    }

    receive() external payable{
        emit Received(msg.sender, msg.value);
    }

    function withdraw() onlyOwner public{
        //only possible when wallet is unlocked
        require(block.timestamp >= unlockDate);
        //transfer entire balance to owner
        uint256 bal = address(this).balance;    
        owner.transfer(bal);
        //emit withdrew event
        emit Withdrew(owner, bal);        
    }

    function info() public view returns(address, address, uint256, uint256, uint256){
        return(creator, owner, unlockDate, createdAt, address(this).balance);
    }

    function getAddress()public view returns(address){
        return address(this);
    }

    event Received(address from, uint256 amount);
    event Withdrew(address, uint256);
   
}