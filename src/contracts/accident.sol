pragma solidity >=0.4.18;

contract accident {
    
   string time;
   string geolocation;
   
   function setInstructor(string memory _time, string  memory _geolocation) public {
       time = _time;
       geolocation = _geolocation;
       
   }
 
   
   function getInstructor() view public returns (string memory, string memory) {
       return (time, geolocation);
   }
    
