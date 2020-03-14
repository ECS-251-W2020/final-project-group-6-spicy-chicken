pragma solidity >=0.4.25 <=0.6.3;

contract Coursetro {
    
   string fName;
   public uint age;
   
   function setInstructor(string memory _fName, uint _age) public {
       fName = _fName;
       age = _age;
   }
   
   function getInstructor() view public returns (uint age) {
       return age;
   }
    
}
