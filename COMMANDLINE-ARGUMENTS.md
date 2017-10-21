# chartio help

chartio expects csv data with the following specification.
- `;` as field delimiter
- `enter` as row delimiter
- The first line contains the data header column titles

## Example data
```bash
Serial Data;Signal;AVG Filter;STD Filter
1;0;0;0
1;0;0;0
1.1;0;0;0
1;0;0;0
0.9;0;1.41756756756757;0.902901944349606
```


## Syntax

```sh
# In this example `GetSignalPeaks.exe` echoes `csv` styled data to console.
GetSignalPeaks.exe | chartio --title test --width 1048
```


## Parameters
|Name|Description|
|----|-----------|
|--ouputfile |Optional ouput filename of the chart image|
|--inputfile |Optional input filename of csv data|
|--width |Width of image.|
|--height |Height of image.|
|--delimiter |Optional data field delimiter defaults to `;`|
|--template |Optional full path to custom HTML template.|
|help, --help, /? |Show this help.|
|version, --version, -v|Show version.|