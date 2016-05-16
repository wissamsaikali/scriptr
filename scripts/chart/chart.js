/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=anonymous 
  **/ 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"GoogleCharts","plugindata":{"scriptName":"chartData","wrapperData":"{\"containerId\":\"chartContainer\",\"dataTable\":{\"cols\":[],\"rows\":[]},\"options\":{\"title\":\"Chart Title\",\"hAxis\":{\"title\":\"Time of Day\",\"textStyle\":{\"fontSize\":12,\"color\":\"#EE8300\",\"bold\":true,\"italic\":false},\"titleTextStyle\":{\"fontSize\":14,\"color\":\"#777\",\"bold\":true,\"italic\":false},\"useFormatFromData\":true,\"minValue\":null,\"maxValue\":null,\"viewWindow\":null,\"viewWindowMode\":null},\"vAxis\":{\"title\":\"Axis title\",\"textStyle\":{\"fontSize\":12,\"color\":\"#EE8300\",\"bold\":false,\"italic\":false},\"titleTextStyle\":{\"fontSize\":14,\"color\":\"#777\",\"bold\":true,\"italic\":false}},\"colors\":[\"#EE8300\",\"#777\"],\"vAxes\":[{\"title\":null,\"minValue\":null,\"maxValue\":null,\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null}},{\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null}],\"isStacked\":false,\"animation\":{\"duration\":500},\"booleanRole\":\"certainty\",\"legend\":\"right\",\"width\":600,\"height\":371},\"state\":{},\"view\":{},\"isDefaultVisualization\":true,\"chartType\":\"ColumnChart\"}"},"scriptrdata":[{"filename":"chartData_chart.html","filecontent":"\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js\"></script>\n\t<script type=\"text/javascript\" src='https://www.google.com/jsapi?autoload={\"modules\":[{ \"name\":\"visualization\",\"version\":\"1\", \n         \"packages\":[\"charteditor\", \"corechart\"]\n         }] \n      }'></script> \n      <script src=\"https://www.scriptr.io/src/js/ScriptrClient.js\"></script>\n  </head>\n  <script>\n\n  \tgoogle.setOnLoadCallback(loadChart);\n\n    var wrapper;\n\n   \tvar scriptrClient =  new $.ScriptrClient({\"url\": \"https://testing.apstrata.com/apsdb/rest/r\", \"token\": \"SkRDRDBFOTkxMA==\", \"anon_token\": \"SkRDRDBFOTkxMA==\"});\n\n \tfunction loadChart() {\n   \t\twrapper = new google.visualization.ChartWrapper({\"containerId\":\"chartContainer\",\"options\":{\"title\":\"Chart Title\",\"hAxis\":{\"title\":\"Time of Day\",\"textStyle\":{\"fontSize\":12,\"color\":\"#EE8300\",\"bold\":true,\"italic\":false},\"titleTextStyle\":{\"fontSize\":14,\"color\":\"#777\",\"bold\":true,\"italic\":false},\"useFormatFromData\":true,\"minValue\":null,\"maxValue\":null,\"viewWindow\":null,\"viewWindowMode\":null},\"vAxis\":{\"title\":\"Axis title\",\"textStyle\":{\"fontSize\":12,\"color\":\"#EE8300\",\"bold\":false,\"italic\":false},\"titleTextStyle\":{\"fontSize\":14,\"color\":\"#777\",\"bold\":true,\"italic\":false}},\"colors\":[\"#EE8300\",\"#777\"],\"vAxes\":[{\"title\":null,\"minValue\":null,\"maxValue\":null,\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null}},{\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null}],\"isStacked\":false,\"animation\":{\"duration\":500},\"booleanRole\":\"certainty\",\"legend\":\"right\",\"width\":600,\"height\":371},\"state\":{},\"view\":{},\"isDefaultVisualization\":true,\"chartType\":\"ColumnChart\"});\n   \t\tscriptrClient.callApi(\"chartData\", {}, function(\n\t\t\tresponse, context) {\n\t   \t\tsetDataSource(response.response.result);\n\t\t}, function(response, context) {\n\t\t}, null);\n  \t}\n\t\n\n    function setDataSource(data) {\n\t  \twrapper.setDataTable(data);\n\t  \tif(wrapper.getChartType() != null) {\n\t  \t\twrapper.draw();\n\t  \t}\n    }\n\n    function drawChart() {\n        wrapper.draw();\n    }\n\n    </script>\n  <body>\n\t  <div id=\"chartContainer\"></div>\n  </body>\n</html>\n"}]}}*#*#*/
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
      <script src=\"https://www.scriptr.io/src/js/ScriptrClient.js\"></script>\n\
  </head>\n\
  <script>\n\
\n\
  	google.setOnLoadCallback(loadChart);\n\
\n\
    var wrapper;\n\
\n\
   	var scriptrClient =  new $.ScriptrClient({\"url\": \"https://testing.apstrata.com/apsdb/rest/r\", \"token\": \"SkRDRDBFOTkxMA==\", \"anon_token\": \"SkRDRDBFOTkxMA==\"});\n\
\n\
 	function loadChart() {\n\
   		wrapper = new google.visualization.ChartWrapper({\"containerId\":\"chartContainer\",\"options\":{\"title\":\"Chart Title\",\"hAxis\":{\"title\":\"Time of Day\",\"textStyle\":{\"fontSize\":12,\"color\":\"#EE8300\",\"bold\":true,\"italic\":false},\"titleTextStyle\":{\"fontSize\":14,\"color\":\"#777\",\"bold\":true,\"italic\":false},\"useFormatFromData\":true,\"minValue\":null,\"maxValue\":null,\"viewWindow\":null,\"viewWindowMode\":null},\"vAxis\":{\"title\":\"Axis title\",\"textStyle\":{\"fontSize\":12,\"color\":\"#EE8300\",\"bold\":false,\"italic\":false},\"titleTextStyle\":{\"fontSize\":14,\"color\":\"#777\",\"bold\":true,\"italic\":false}},\"colors\":[\"#EE8300\",\"#777\"],\"vAxes\":[{\"title\":null,\"minValue\":null,\"maxValue\":null,\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null}},{\"useFormatFromData\":true,\"viewWindow\":{\"max\":null,\"min\":null},\"minValue\":null,\"maxValue\":null}],\"isStacked\":false,\"animation\":{\"duration\":500},\"booleanRole\":\"certainty\",\"legend\":\"right\",\"width\":600,\"height\":371},\"state\":{},\"view\":{},\"isDefaultVisualization\":true,\"chartType\":\"ColumnChart\"});\n\
   		scriptrClient.callApi(\"chartData\", {}, function(\n\
			response, context) {\n\
	   		setDataSource(response.response.result);\n\
		}, function(response, context) {\n\
		}, null);\n\
  	}\n\
	\n\
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