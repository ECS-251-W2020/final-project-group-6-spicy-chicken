package main

import (
    "context"
    //"crypto/ecdsa"
    "fmt"
    "log"
    "math/big"

    "github.com/ethereum/go-ethereum/accounts"
    "github.com/ethereum/go-ethereum/accounts/keystore"

    "github.com/ethereum/go-ethereum/accounts/abi/bind"
    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    "github.com/ethereum/go-ethereum/crypto"

    incident "./build"
)
var GETH_NODE = "http://localhost:8545"
var PRIVATE_KEY = "df505d175ae63abf209bad9dda965310d99559620551e74521a6798a41215f46"
    // Please don't do something like this in production, okay?
var ACCT_ADDR = "0x8cc5a1a0802db41db826c2fcb72423744338dcb0"
var CONTRACT_ADDR = "0xbb85B721aaEdFeC6B47Ea2b7DbEcE57194481137" //"0x18f4ca4Fe0ABAaf2446a388F18BC119C3981762b"
var KEYSTORE_DIR = "/home/uttie/final-project-group-6-spicy-chicken/dev-nodes/.ether-n1/keystore"
var SIGN_PASSPHRASE = "pass"

func initGeth() {

    fmt.Println("init geth");

    ks := keystore.NewKeyStore(
        KEYSTORE_DIR,
        keystore.LightScryptN,
        keystore.LightScryptP)
    fmt.Println()

    // Create account definitions
    fromAccDef := accounts.Account{
        Address: common.HexToAddress(ACCT_ADDR),
    }

    // Find the signing account
    signAcc, err := ks.Find(fromAccDef)
    if err != nil {
        fmt.Println("account keystore find error:")
        panic(err)
    }
    fmt.Printf("account found: signAcc.addr=%s; signAcc.url=%s\n", signAcc.Address.String(), signAcc.URL)
    fmt.Println()

    // Unlock the signing account
    errUnlock := ks.Unlock(signAcc, SIGN_PASSPHRASE)
    if errUnlock != nil {
        fmt.Println("account unlock error:")
        panic(err)
    }
    fmt.Printf("account unlocked: signAcc.addr=%s; signAcc.url=%s\n", signAcc.Address.String(), signAcc.URL)

    ctx := context.Background()

    client, err := ethclient.Dial(GETH_NODE)
    if err != nil {
        log.Fatalf("could not connect to Ethereum gateway: %v\n", err)
    }
    defer client.Close()


    privateKey, err := crypto.HexToECDSA(PRIVATE_KEY)
    if err != nil {
        log.Fatal("private key:", err)
    }

/*
    publicKey := privateKey.Public()
    publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
    if !ok {
        log.Fatal("cannot assert type: publicKey is not of type *ecdsa.PublicKey")
    }

    fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
    fmt.Println("from:", fromAddress);

*/
    fmt.Println("from2: %x", signAcc.Address);
    nonce, err := client.PendingNonceAt(context.Background(), signAcc.Address)
    if err != nil {
        log.Fatal(err)
    }

    //accountAddress := fromAddress
    //accountAddress := common.HexToAddress(signAcc.Address)
    balance, err := client.BalanceAt(ctx, signAcc.Address, nil)
    if err != nil {
        log.Fatalf("unable to get balance: %v\n", err)
    }
    fmt.Printf("Balance: %d\n", balance)

    gasPrice, err := client.SuggestGasPrice(context.Background())
    if err != nil {
        log.Fatal("GasPrice: ", err)
    }

    auth := bind.NewKeyedTransactor(privateKey)
    auth.Nonce = big.NewInt(int64(nonce))
    auth.Value = big.NewInt(0)     // in wei
    ///auth.GasLimit = uint64(1000000) // in units
    auth.GasLimit = uint64(1000000) // in units
    auth.GasPrice = big.NewInt(1000000000000000000)

    fmt.Println("GasPrice: ", gasPrice);

    address := common.HexToAddress(CONTRACT_ADDR)
    instance, err := incident.NewIncident(address, client)
    if err != nil {
        log.Fatal("new incident: ", err)
    }
    fmt.Println("inst:", instance);

/*
    key := [32]byte{}
    value := [32]byte{}
    copy(key[:], []byte("foo"))
    copy(value[:], []byte("bar"))

SetAccident(_id string, _lati string, _longi string, _speed string, _heading string, _timestamp string, _verified bool)
*/

    tx, err := instance.SetAccident(auth, "1234", "23", "24", "1", "N11", "2989324", true)
    //tx, err := instance.GetAccident(auth, big.NewInt(3))
    //tx, err := instance.SetAccident(auth, key, value)
    if err != nil {
        log.Fatal("setaccident: ", err)
    }

    fmt.Printf("tx sent: %s", tx.Hash().Hex()) // tx sent: 0x8d490e535678e9a24360e955d75b27ad307bdfb97a1dca51d0f3035dcee3e870

/*
    result, err := instance.Items(nil, key)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(result[:])) // "bar"
*/




/*
    auth := bind.NewKeyedTransactor(privateKey)
    auth.Nonce = big.NewInt(int64(nonce))
    auth.Value = big.NewInt(0)     // in wei
    auth.GasLimit = uint64(300000) // in units
    auth.GasPrice = gasPrice

    input := "1.0"
    address, tx, instance, err := incident.DeployIncident(auth, client, input)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(address.Hex())   // 0x147B8eb97fD247D06C4006D269c90C1908Fb5D54
    fmt.Println(tx.Hash().Hex()) // 0xdae8ba5444eefdc99f4d45cd0c4f24056cba6a02cefbf78066ef9f4188ff7dc0

    _ = instance
*/
}

/*
func main() {
    client, err := ethclient.Dial(GETH_NODE)
    if err != nil {
        log.Fatal(err)
    }

    privateKey, err := crypto.HexToECDSA(PRIVATE_KEY)
    if err != nil {
        log.Fatal(err)
    }

    publicKey := privateKey.Public()
    publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
    if !ok {
        log.Fatal("cannot assert type: publicKey is not of type *ecdsa.PublicKey")
    }

    fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)
    nonce, err := client.PendingNonceAt(context.Background(), fromAddress)
    if err != nil {
        log.Fatal(err)
    }

    gasPrice, err := client.SuggestGasPrice(context.Background())
    if err != nil {
        log.Fatal(err)
    }

    auth := bind.NewKeyedTransactor(privateKey)
    auth.Nonce = big.NewInt(int64(nonce))
    auth.Value = big.NewInt(0)     // in wei
    auth.GasLimit = uint64(300000) // in units
    auth.GasPrice = gasPrice

    address := common.HexToAddress("0x18f4ca4Fe0ABAaf2446a388F18BC119C3981762b")
    instance, err := incident.NewIncident(address, client)
    if err != nil {
        log.Fatal(err)
    }

    key := [32]byte{}
    value := [32]byte{}
    copy(key[:], []byte("foo"))
    copy(value[:], []byte("bar"))

    tx, err := instance.SetItem(auth, key, value)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("tx sent: %s", tx.Hash().Hex()) // tx sent: 0x8d490e535678e9a24360e955d75b27ad307bdfb97a1dca51d0f3035dcee3e870

    result, err := instance.Items(nil, key)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(result[:])) // "bar"
}
*/

