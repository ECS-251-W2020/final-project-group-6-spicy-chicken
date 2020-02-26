contract AlarmAccount {

    // data structure of a single alarm
    struct Alarm {
        uint timestamp;
        string latitude;
        string longitude;
        string accountId;
    }

    // "array" of all alarms of this account: maps the alarm id to the actual alarm
    mapping (uint => Alarm) _alarms;

    // total number of alarms in the above _alarms mapping
    uint _numberOfAlarms;

    // "owner" of this account: only admin is allowed to alarm
    address _ownerAddress;

    // constructor
    constructor() public{
        _numberOfAlarms = 0;
        _ownerAddress = msg.sender;
    }
    
    // create new alarm 
    function alarm(string memory alarmString, uint timestamp, string memory lat, string memory long) public returns (int result) {
        _alarms[_numberOfAlarms].timestamp = timestamp;
        //_alarms[_numberOfAlarms].alarmString = alarmString;
        _alarms[_numberOfAlarms].latitude = lat;
        _alarms[_numberOfAlarms].longitude = long;
        _numberOfAlarms++;
    }
            
    function getAlarm(uint alarmId) view public returns (string memory accountId, uint timestamp) {
        // returns two values
        accountId = _alarms[alarmId].accountId;
        timestamp = _alarms[alarmId].timestamp;
    }
    
    function getOwnerAddress() view public returns (address ownerAddress) {
        return _ownerAddress;
    }
}

