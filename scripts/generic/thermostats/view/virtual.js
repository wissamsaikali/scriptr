/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"CodeMirrorArbitraryFile","plugindata":{"fileData":"<html>\n\t<head><title>Virtual thermostat</title><head>\n\t\n\t<script>\n\n        var ws = new WebSocket(\"wss://api.scriptrapps.io/RzM1RkYwQzc4Mg==\");\n        ws.onopen = function() {\n          console.log(\"Connected\");\n          var subscribeMsg = {\"method\":\"Subscribe\", \"params\":{\"channel\":\"virtual_devices\"}};\n          ws.send(JSON.stringify(subscribeMsg));\n        };\n\n        ws.onmessage = function(event) {\n          console.log(event.data);\n          if (event.data) {\n\n            var data = JSON.parse(event.data);\n            if (deviceId && data.deviceId && deviceId == data.deviceId) {\n              showDevice(data.data);\n            }\n          }\n        };\n\n        ws.onclose = function() {\n          console.log(\"connection lost\");\n        };\n\n        ws.onerror = function(error) {\n          console.log(error);\n        };\n\n        function send(url, method, params, onSuccess, onFailure) {\n\n          var xhr = new XMLHttpRequest();                \n          xhr.open(method, url);\n          xhr.setRequestHeader(\"Authorization\", \"Bearer RzM1RkYwQzc4Mg==\");\n          if (!params) {\n            xhr.send();\n          }else {\n\n            xhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\n            xhr.send(params);\n          }\n\n          xhr.onreadystatechange = function() {\n\n            if (xhr.readyState == 4) {\n\n              if (xhr.status == 200) {\n\n                var responseObj = JSON.parse(xhr.responseText);\n                if (responseObj.response.metadata.status == \"failure\") {\n                  return onFailure(responseObj.response.metadata);\n                }\n\n                if (responseObj.response.result.errorCode) {\n                  return onFailure(responseObj.response.result);\n                }\n\n                onSuccess(responseObj.response.result);\n              }else {\n                onFailure(xhr.responseText);\n              }\n            }\n          }\n        } \n\n        function initialize() {\n\n          var deviceIdParam = \n          \twindow.location.href.substring(window.location.href.lastIndexOf(\"?\") + 1, window.location.href.length);\n          deviceIdParam = deviceIdParam.substring(deviceIdParam.lastIndexOf(\"&\") + 1, deviceIdParam.length);\n          var keyValue = deviceIdParam.split(\"=\"); \"\";\n          var url = \"\";\n          if (keyValue && keyValue[1] && keyValue[0] != \"auth_token\") {\n            \n            url = \"https://api.scriptrapps.io/generic/thermostats/api/device?id=\" + keyValue[1];\n            deviceId = keyValue[1];\n          } else{\n            url = \"https://api.scriptrapps.io/generic/thermostats/api/create\";\n          }\n\n          var onSuccess = function(result) { \t\t\n            showDevice(result);            \t\n          }\n\n          var onFailure = function(error) {\n            alert(error);\n          };\n\n          send(url, \"GET\", null, onSuccess, onFailure);\n        }\n\n        function showDevice(data) {\n\n          var deviceId = document.getElementById(\"deviceId\");\n          deviceId.innerHTML = \"Device id: \" + data.deviceId;\n          var deviceName = document.getElementById(\"deviceName\");\n          deviceName.innerHTML = \"Device name: \" + data.name;\n          var structureId = document.getElementById(\"structureId\");\n          structureId.innerHTML = \"Structure id: \" + data.structureId;\n          var temperature = document.getElementById(\"temperature\");\n          temperature.innerHTML = \"Temperature: \" + data.temperature;\n          var humidity = document.getElementById(\"humidity\");\n          humidity.innerHTML = \"Humidity: \" + data.humidity;\n          var targetTemperature = document.getElementById(\"targetTemperature\");\n          targetTemperature.innerHTML = \"Target temperature: \" + data.targetTemperature;\n          var mode = document.getElementById(\"mode\");\n          mode.innerHTML = \"Mode: \" + data.mode;\n          var fanMode = document.getElementById(\"fanMode\");\n          fanMode.innerHTML = \"Fan Mode: \" + data.fanMode;\n          var online = document.getElementById(\"online\");\n          online.innerHTML = \"Status: \" + (data.online ? \"online\" : \"offline\");\n        }\n\n\t\tvar deviceId = \"\";\n    </script>\n\t<body onload=\"initialize()\">\n\t\t<div id=\"device\">\n\t\t\t<div id=\"deviceId\"></div>\n\t\t\t<div id=\"deviceName\"></div>\n\t\t\t<div id=\"structureId\"></div>\n\t\t\t<div id=\"temperature\"></div>\n\t\t\t<div id=\"humidity\"></div>\n\t\t\t<div id=\"targetTemperature\"></div>\n\t\t\t<div id=\"mode\"></div>\n\t\t\t<div id=\"fanMode\"></div>\n\t\t\t<div id=\"online\"></div>\n\t\t</div>\n\t</body>\n</html>"},"scriptrdata":[]}}*#*#*/
var content= '<html>\n\
	<head><title>Virtual thermostat</title><head>\n\
	\n\
	<script>\n\
\n\
        var ws = new WebSocket(\"wss://api.scriptrapps.io/RzM1RkYwQzc4Mg==\");\n\
        ws.onopen = function() {\n\
          console.log(\"Connected\");\n\
          var subscribeMsg = {\"method\":\"Subscribe\", \"params\":{\"channel\":\"virtual_devices\"}};\n\
          ws.send(JSON.stringify(subscribeMsg));\n\
        };\n\
\n\
        ws.onmessage = function(event) {\n\
          console.log(event.data);\n\
          if (event.data) {\n\
\n\
            var data = JSON.parse(event.data);\n\
            if (deviceId && data.deviceId && deviceId == data.deviceId) {\n\
              showDevice(data.data);\n\
            }\n\
          }\n\
        };\n\
\n\
        ws.onclose = function() {\n\
          console.log(\"connection lost\");\n\
        };\n\
\n\
        ws.onerror = function(error) {\n\
          console.log(error);\n\
        };\n\
\n\
        function send(url, method, params, onSuccess, onFailure) {\n\
\n\
          var xhr = new XMLHttpRequest();                \n\
          xhr.open(method, url);\n\
          xhr.setRequestHeader(\"Authorization\", \"Bearer RzM1RkYwQzc4Mg==\");\n\
          if (!params) {\n\
            xhr.send();\n\
          }else {\n\
\n\
            xhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\n\
            xhr.send(params);\n\
          }\n\
\n\
          xhr.onreadystatechange = function() {\n\
\n\
            if (xhr.readyState == 4) {\n\
\n\
              if (xhr.status == 200) {\n\
\n\
                var responseObj = JSON.parse(xhr.responseText);\n\
                if (responseObj.response.metadata.status == \"failure\") {\n\
                  return onFailure(responseObj.response.metadata);\n\
                }\n\
\n\
                if (responseObj.response.result.errorCode) {\n\
                  return onFailure(responseObj.response.result);\n\
                }\n\
\n\
                onSuccess(responseObj.response.result);\n\
              }else {\n\
                onFailure(xhr.responseText);\n\
              }\n\
            }\n\
          }\n\
        } \n\
\n\
        function initialize() {\n\
\n\
          var deviceIdParam = \n\
          	window.location.href.substring(window.location.href.lastIndexOf(\"?\") + 1, window.location.href.length);\n\
          deviceIdParam = deviceIdParam.substring(deviceIdParam.lastIndexOf(\"&\") + 1, deviceIdParam.length);\n\
          var keyValue = deviceIdParam.split(\"=\"); \"\";\n\
          var url = \"\";\n\
          if (keyValue && keyValue[1] && keyValue[0] != \"auth_token\") {\n\
            \n\
            url = \"https://api.scriptrapps.io/generic/thermostats/api/device?id=\" + keyValue[1];\n\
            deviceId = keyValue[1];\n\
          } else{\n\
            url = \"https://api.scriptrapps.io/generic/thermostats/api/create\";\n\
          }\n\
\n\
          var onSuccess = function(result) { 		\n\
            showDevice(result);            	\n\
          }\n\
\n\
          var onFailure = function(error) {\n\
            alert(error);\n\
          };\n\
\n\
          send(url, \"GET\", null, onSuccess, onFailure);\n\
        }\n\
\n\
        function showDevice(data) {\n\
\n\
          var deviceId = document.getElementById(\"deviceId\");\n\
          deviceId.innerHTML = \"Device id: \" + data.deviceId;\n\
          var deviceName = document.getElementById(\"deviceName\");\n\
          deviceName.innerHTML = \"Device name: \" + data.name;\n\
          var structureId = document.getElementById(\"structureId\");\n\
          structureId.innerHTML = \"Structure id: \" + data.structureId;\n\
          var temperature = document.getElementById(\"temperature\");\n\
          temperature.innerHTML = \"Temperature: \" + data.temperature;\n\
          var humidity = document.getElementById(\"humidity\");\n\
          humidity.innerHTML = \"Humidity: \" + data.humidity;\n\
          var targetTemperature = document.getElementById(\"targetTemperature\");\n\
          targetTemperature.innerHTML = \"Target temperature: \" + data.targetTemperature;\n\
          var mode = document.getElementById(\"mode\");\n\
          mode.innerHTML = \"Mode: \" + data.mode;\n\
          var fanMode = document.getElementById(\"fanMode\");\n\
          fanMode.innerHTML = \"Fan Mode: \" + data.fanMode;\n\
          var online = document.getElementById(\"online\");\n\
          online.innerHTML = \"Status: \" + (data.online ? \"online\" : \"offline\");\n\
        }\n\
\n\
		var deviceId = \"\";\n\
    </script>\n\
	<body onload=\"initialize()\">\n\
		<div id=\"device\">\n\
			<div id=\"deviceId\"></div>\n\
			<div id=\"deviceName\"></div>\n\
			<div id=\"structureId\"></div>\n\
			<div id=\"temperature\"></div>\n\
			<div id=\"humidity\"></div>\n\
			<div id=\"targetTemperature\"></div>\n\
			<div id=\"mode\"></div>\n\
			<div id=\"fanMode\"></div>\n\
			<div id=\"online\"></div>\n\
		</div>\n\
	</body>\n\
</html>';  response.write(content);response.close();			