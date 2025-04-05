var myHeaders = new Headers();
myHeaders.append(
  'User-Agent',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
);
myHeaders.append('referer', 'https://pan.baidu.com/s/1rHIveQKyx6d7MIc0xSv1kg');
myHeaders.append(
  'Cookie',
  'BDUSS=TRKRVBZd3FhcnhKNy1Fdnh4TmtHeGtkMzVocVNDbm9CQ3k3cmUza3g1bTZmTEJuSUFBQUFBJCQAAAAAAAAAAAEAAADZh53Juf2~zXdqaGN0ZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALrviGe674hnc;STOKEN=c29f5849adba8e0c2582719490bb482cb3d5b4f1919b572d2f026f60a4362c2a',
);
myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

var urlencoded = new URLSearchParams();
urlencoded.append('fsidlist', '[571572122662639,1003125036077605,66976333979126]');
urlencoded.append('path', '/duPanxParser');

console.log(urlencoded, 'urlencoded');
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow',
};

var url = `https://pan.baidu.com/share/transfer?shareid=56778218761&from=1099654868282&sekey=T0nfxb51Uz6L6G4TATRMTVNVOhQoNH0gzq%2BUn%2BZhlys%3D&ondup=newcopy&channel=chunlei&web=1&app_id=250528&bdstoken=26ca0e080169ba3a3bcc38feb99eac45&logid=MDVDMTBCQUI2MTg1NjQwMEREMURENTM2NEQwRUM2RUQ6Rkc9MQ==&clienttype=0`;
console.log(url, 'url');
fetch(url, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
