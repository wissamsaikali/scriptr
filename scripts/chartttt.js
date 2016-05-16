/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"GoogleCharts","plugindata":{"scriptName":"SampleData","wrapperData":"{\"containerId\":\"chartContainer\",\"dataTable\":{\"cols\":[{\"id\":\"task\",\"label\":\"Employee Name\",\"type\":\"string\"},{\"id\":\"startDate\",\"label\":\"Start Date\",\"type\":\"date\"}],\"rows\":[{\"c\":[{\"v\":\"Mike\"},{\"v\":\"2008-02-28T00:00:00.000Z\",\"f\":\"February 28, 2008\"}]},{\"c\":[{\"v\":\"Bob\"},{\"v\":\"Date(2007, 5, 1)\"}]},{\"c\":[{\"v\":\"Alice\"},{\"v\":\"Date(2006, 7, 16)\"}]},{\"c\":[{\"v\":\"Frank\"},{\"v\":\"Date(2007, 11, 28)\"}]},{\"c\":[{\"v\":\"Floyd\"},{\"v\":\"Date(2005, 3, 13)\"}]},{\"c\":[{\"v\":\"Fritz\"},{\"v\":\"Date(2011, 6, 1)\"}]}]},\"options\":{\"hAxis\":{\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null},\"legend\":\"right\",\"title\":\"Chart Title\",\"vAxes\":[{\"title\":null,\"minValue\":null,\"maxValue\":null,\"viewWindow\":{\"max\":null,\"min\":null},\"useFormatFromData\":true},{\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null,\"useFormatFromData\":true}],\"booleanRole\":\"certainty\"},\"state\":{},\"view\":{},\"isDefaultVisualization\":false,\"chartType\":\"Gauge\"}"},"scriptrdata":[{"filename":"SampleData_chart.html","filecontent":"\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js\"></script>\n\t<script type=\"text/javascript\" src='https://www.google.com/jsapi?autoload={\"modules\":[{ \"name\":\"visualization\",\"version\":\"1\", \n         \"packages\":[\"charteditor\", \"corechart\"]\n         }] \n      }'></script> \n  </head>\n  <script>\n\n  \tgoogle.setOnLoadCallback(loadChart);\n\n    var wrapper;\n\n\tvar baseURL = window.location.origin + window.location.pathname.substring(0,window.location.pathname.indexOf(\"SampleData\"))\n\n\tvar options = {\n\t\ttype: \"POST\",\n\t\turl: baseURL + \"SampleData\",\n\t\tsuccess: function() {},\n\t\tfailure: function() {},\n\t\tdataType: \"json\",\n\t\tprocessData: false, \n\t\tcontentType: false\n\t};\n\n\n\t$.urlParam = function(name){\n    \tvar results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);\n    \tif (results==null){\n      \t\treturn null;\n    \t}else{\n       \t\treturn results[1] || 0;\n    \t\t}\n\t}\n\t\n    var token = $.urlParam('auth_token')\n\t\n\tif(token) {\n\t\toptions[\"headers\"] = { \"Authorization\":  \"bearer \" + token };\n\t}\n\n \tfunction loadChart() {\n   \t\twrapper = new google.visualization.ChartWrapper({\"containerId\":\"chartContainer\",\"options\":{\"hAxis\":{\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null},\"legend\":\"right\",\"title\":\"Chart Title\",\"vAxes\":[{\"title\":null,\"minValue\":null,\"maxValue\":null,\"viewWindow\":{\"max\":null,\"min\":null},\"useFormatFromData\":true},{\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null,\"useFormatFromData\":true}],\"booleanRole\":\"certainty\"},\"state\":{},\"view\":{},\"isDefaultVisualization\":false,\"chartType\":\"Gauge\"});\n\t\t$.ajax(options).done(function(response) {\n\t\t  \t  \tsetDataSource(response.response.result);\n\t\t \t })\n\t\t \t .fail(function(response ) {\n\t\t \t\tvar out = \"\";\n\t\t\tif(response.status == 0 && response.statusText == \"error\" && response.readyState == 0 && response.responseText == \"\"){\n\t\t\t\tout += \"An error has occurred. This is most likely a cross-domain issue. In case you modified the response object in your script, try adding response.addHeaders(configuration.crossDomainHeaders) to your code.\";\n\t\t\t}else{\n\t\t\t\tvar output = response;\n\t\t\t\tif(response.responseJSON){\n\t\t\t\t\tout += \"Your chart data source script returned a \"+ response.responseJSON.response.metadata.errorCode + \" error.\"\n\t\t\t\t}\n\t\t\t}\n\t\t\t$(\"#chartContainer\").html(out);\n\t\t  \t})\n\t\t  \t.always(function(data) {\n\t\t\t});\n  \t}\n\t\n    function setDataSource(data) {\n\t  \twrapper.setDataTable(data);\n\t  \tif(wrapper.getChartType() != null) {\n\t  \t\twrapper.draw();\n\t  \t}\n    }\n\n    function drawChart() {\n        wrapper.draw();\n    }\n\n    </script>\n  <body>\n\t  <div id=\"chartContainer\"></div>\n  </body>\n</html>\n"}]}}*#*#*/
var content= '\n\
<!DOCTYPE html>\n\
<html>\n\
  <head>\n\
    <meta charset=\"utf-8\">\n\
	<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js\"></script>\n\
	<script type=\"text/javascript\" src=\'https://www.google.com/jsapi?autoload={\"modules\":[{ \"name\":\"visualization\",\"version\":\"1\", \n\
         \"packages\":[\"charteditor\", \"corechart\"]\n\
         }] \n\
      }\'></script> \n\
  </head>\n\
  <script>\n\
\n\
  	google.setOnLoadCallback(loadChart);\n\
\n\
    var wrapper;\n\
\n\
	var baseURL = window.location.origin + window.location.pathname.substring(0,window.location.pathname.indexOf(\"SampleData\"))\n\
\n\
	var options = {\n\
		type: \"POST\",\n\
		url: baseURL + \"SampleData\",\n\
		success: function() {},\n\
		failure: function() {},\n\
		dataType: \"json\",\n\
		processData: false, \n\
		contentType: false\n\
	};\n\
\n\
\n\
	$.urlParam = function(name){\n\
    	var results = new RegExp(\'[\\?&]\' + name + \'=([^&#]*)\').exec(window.location.href);\n\
    	if (results==null){\n\
      		return null;\n\
    	}else{\n\
       		return results[1] || 0;\n\
    		}\n\
	}\n\
	\n\
    var token = $.urlParam(\'auth_token\')\n\
	\n\
	if(token) {\n\
		options[\"headers\"] = { \"Authorization\":  \"bearer \" + token };\n\
	}\n\
\n\
 	function loadChart() {\n\
   		wrapper = new google.visualization.ChartWrapper({\"containerId\":\"chartContainer\",\"options\":{\"hAxis\":{\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null},\"legend\":\"right\",\"title\":\"Chart Title\",\"vAxes\":[{\"title\":null,\"minValue\":null,\"maxValue\":null,\"viewWindow\":{\"max\":null,\"min\":null},\"useFormatFromData\":true},{\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null,\"useFormatFromData\":true}],\"booleanRole\":\"certainty\"},\"state\":{},\"view\":{},\"isDefaultVisualization\":false,\"chartType\":\"Gauge\"});\n\
		$.ajax(options).done(function(response) {\n\
		  	  	setDataSource(response.response.result);\n\
		 	 })\n\
		 	 .fail(function(response ) {\n\
		 		var out = \"\";\n\
			if(response.status == 0 && response.statusText == \"error\" && response.readyState == 0 && response.responseText == \"\"){\n\
				out += \"An error has occurred. This is most likely a cross-domain issue. In case you modified the response object in your script, try adding response.addHeaders(configuration.crossDomainHeaders) to your code.\";\n\
			}else{\n\
				var output = response;\n\
				if(response.responseJSON){\n\
					out += \"Your chart data source script returned a \"+ response.responseJSON.response.metadata.errorCode + \" error.\"\n\
				}\n\
			}\n\
			$(\"#chartContainer\").html(out);\n\
		  	})\n\
		  	.always(function(data) {\n\
			});\n\
  	}\n\
	\n\
    function setDataSource(data) {\n\
	  	wrapper.setDataTable(data);\n\
	  	if(wrapper.getChartType() != null) {\n\
	  		wrapper.draw();\n\
	  	}\n\
    }\n\
\n\
    function drawChart() {\n\
        wrapper.draw();\n\
    }\n\
\n\
    </script>\n\
  <body>\n\
	  <div id=\"chartContainer\"></div>\n\
  </body>\n\
</html>\n\
'; var response = apsdb.httpRespond(); response.write(content);response.close();			