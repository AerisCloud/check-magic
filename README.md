# check-magic

Manage your app's status with a file.

## Constructor

### `CheckMagic( [options] )`

`options` is an optional object that can contain:

``` json
{
	"offline": "maintenance",
	"online": "production",
	"path": "./check.txt",
	"leave": false,
	"startOffline": false
}
```

#### `offline`:
The string that will be written to check.txt when your app is offline. Defaults to `maintenance`

#### `online`:
The string that will be written to check.txt when your app is online. Defaults to `production`

#### `path`:
The path to check.txt. Defaults to `./check.txt`

#### `leave`:
If leave is not set to true, CheckMagic will remove check.txt when the process exits. Defaults to `false`

#### `startOffline`:
If startOffline is not set to true, you will need to call `goOnline` to indicate your server is online. Defaults to `false`

## Methods

### `getStatus()`
Returns the contents of check.txt as a string. If check.txt is inaccessible it will return your offline string.

### `goOffline()`
Writes your offline string to check.txt

### `goOnline()`
Writes your online string to check.txt
