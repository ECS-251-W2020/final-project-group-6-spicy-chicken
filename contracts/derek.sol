pragma solidity >=0.4.18;

contract StorageTest {

    
    mapping(int => badcase) accidents;
    
    struct badcase {
        string id;
        string latitude;
        string longtide;
        string speed;
        string heading;
        string Timestamp;
        bool  verified;
        //other attributes
    }


    int public i;
    function setInstructor(string memory _id, string memory _lati, string memory _longi, string memory _speed,
    string memory _heading, string memory _Timestamp,bool _verified) public {
        i+=1;
        accidents[i].id=_id;
        accidents[i].latitude=_lati;
        accidents[i].longtide=_longi;
        accidents[i].speed=_speed;
        accidents[i].heading=_heading;
        accidents[i].Timestamp=_Timestamp;
        accidents[i].verified=_verified;
    }
    function getInstructor(int  i) view public returns (string memory _id, string memory _lati, string memory _longi, string memory _speed,
    string memory _heading, string memory _Timestamp,bool _verified) {
        
        
       return (accidents[i].id, accidents[i].latitude, accidents[i].longtide, accidents[i].speed, accidents[i].heading, accidents[i].Timestamp, accidents[i].verified);
       
       
   }
  
   
  
}
