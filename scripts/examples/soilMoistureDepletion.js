/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var samples =  [
	{
		"capture_ts": "2015-10-08T08:43:00Z",
		"par_umole_m2s": 0.1,
		"air_temperature_celsius": 26.10394916,
		"vwc_percent": 36.0808533306198
	},
	{
		"capture_ts": "2015-10-08T08:58:00Z",
		"par_umole_m2s": 0.147576860061291,
		"air_temperature_celsius": 25.428606875,
		"vwc_percent": 36.0648689228616
	},
	{
		"capture_ts": "2015-10-08T09:13:00Z",
		"par_umole_m2s": 0.1,
		"air_temperature_celsius": 25.15729399796,
		"vwc_percent": 36.170750688959
	},
	{
		"capture_ts": "2015-10-08T09:28:00Z",
		"par_umole_m2s": 0.320459347777859,
		"air_temperature_celsius": 24.93064308736,
		"vwc_percent": 36.1628216939661
	},
	{
		"capture_ts": "2015-10-08T09:43:00Z",
		"par_umole_m2s": 0.150326787637926,
		"air_temperature_celsius": 25.29303936512,
		"vwc_percent": 36.1628216939661
	},
	{
		"capture_ts": "2015-10-08T09:58:00Z",
		"par_umole_m2s": 0.1,
		"air_temperature_celsius": 25.06669584172,
		"vwc_percent": 36.1588689516991
	},
	{
		"capture_ts": "2015-10-08T10:13:00Z",
		"par_umole_m2s": 0.371081041204035,
		"air_temperature_celsius": 25.15729399796,
		"vwc_percent": 36.1509869417157
	},
	{
		"capture_ts": "2015-10-08T10:28:00Z",
		"par_umole_m2s": 0.1,
		"air_temperature_celsius": 25.15729399796,
		"vwc_percent": 36.1470576595919
	},
	{
		"capture_ts": "2015-10-08T10:43:00Z",
		"par_umole_m2s": 0.1,
		"air_temperature_celsius": 25.56400145888,
		"vwc_percent": 36.1431361830841
	},
	{
		"capture_ts": "2015-10-08T10:58:00Z",
		"par_umole_m2s": 0.25829462810384,
		"air_temperature_celsius": 25.428606875,
		"vwc_percent": 36.139222504952
	},
	{
		"capture_ts": "2015-10-08T11:13:00Z",
		"par_umole_m2s": 0.151780471170246,
		"air_temperature_celsius": 25.69922804804,
		"vwc_percent": 36.139222504952
	},
	{
		"capture_ts": "2015-10-08T11:28:00Z",
		"par_umole_m2s": 0.1,
		"air_temperature_celsius": 25.83429157376,
		"vwc_percent": 36.1353166179408
	},
	{
		"capture_ts": "2015-10-08T11:43:00Z",
		"par_umole_m2s": 0.684215776057857,
		"air_temperature_celsius": 25.78928821228,
		"vwc_percent": 36.1353166179408
	},
	{
		"capture_ts": "2015-10-08T11:58:00Z",
		"par_umole_m2s": 0.210122456949429,
		"air_temperature_celsius": 26.01413114368,
		"vwc_percent": 36.1275281881891
	}
];
var variation = 0;
var total = samples.length;
for (var i = 0; i < samples.length - 1; i++) {
 if (i < samples.length - 1) {
    
   if (samples[i].vwc_percent >= samples[i + 1].vwc_percent) {
  	variation = (variation + (samples[i].vwc_percent - samples[i + 1].vwc_percent));
     console.log(variation + "," +  i);
   }else {
     variation = 0;
     total -= 1;
   }
 }

}

variation = variation / total;
console.log(variation + "," +  total);

return variation;			