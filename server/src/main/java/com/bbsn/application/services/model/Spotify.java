package com.bbsn.application.services.model;

import javax.persistence.Entity;

import org.json.JSONObject;

import com.bbsn.application.services.widgets.model.Widget;
import com.bbsn.application.services.widgets.model.WidgetParam;

@Entity
public class Spotify extends Services {
	
	public static final JSONObject FILTERS = new JSONObject("{\"market\": [" + 
			"\"AD\",\r\n" + 
			"\"AR\",\r\n" + 
			"\"AT\",\r\n" + 
			"\"AU\",\r\n" + 
			"\"BE\",\r\n" + 
			"\"BG\",\r\n" + 
			"\"BO\",\r\n" + 
			"\"BR\",\r\n" + 
			"\"CA\",\r\n" + 
			"\"CH\",\r\n" + 
			"\"CL\",\r\n" + 
			"\"CO\",\r\n" + 
			"\"CR\",\r\n" + 
			"\"CY\",\r\n" + 
			"\"CZ\",\r\n" + 
			"\"DE\",\r\n" + 
			"\"DK\",\r\n" + 
			"\"DO\",\r\n" + 
			"\"EC\",\r\n" + 
			"\"EE\",\r\n" + 
			"\"ES\",\r\n" + 
			"\"FI\",\r\n" + 
			"\"FR\",\r\n" + 
			"\"GB\",\r\n" + 
			"\"GR\",\r\n" + 
			"\"GT\",\r\n" + 
			"\"HK\",\r\n" + 
			"\"HN\",\r\n" + 
			"\"HU\",\r\n" + 
			"\"ID\",\r\n" + 
			"\"IE\",\r\n" + 
			"\"IL\",\r\n" + 
			"\"IS\",\r\n" + 
			"\"IT\",\r\n" + 
			"\"JP\",\r\n" + 
			"\"LI\",\r\n" + 
			"\"LT\",\r\n" + 
			"\"LU\",\r\n" + 
			"\"LV\",\r\n" + 
			"\"MC\",\r\n" + 
			"\"MT\",\r\n" + 
			"\"MX\",\r\n" + 
			"\"MY\",\r\n" + 
			"\"NI\",\r\n" + 
			"\"NL\",\r\n" + 
			"\"NO\",\r\n" + 
			"\"NZ\",\r\n" + 
			"\"PA\",\r\n" + 
			"\"PE\",\r\n" + 
			"\"PH\",\r\n" + 
			"\"PL\",\r\n" + 
			"\"PT\",\r\n" + 
			"\"PY\",\r\n" + 
			"\"RO\",\r\n" + 
			"\"SE\",\r\n" + 
			"\"SG\",\r\n" + 
			"\"SK\",\r\n" + 
			"\"SV\",\r\n" + 
			"\"TH\",\r\n" + 
			"\"TR\",\r\n" + 
			"\"TW\",\r\n" + 
			"\"US\",\r\n" + 
			"\"UY\",\r\n" + 
			"\"VN\",\r\n" + 
			"\"ZA\"\n" + 
			"],\n\"type\":[" +
			"\"album\",\r\n" + 
			"\"artist\",\r\n" + 
			"\"playlist\",\r\n" + 
			"\"track\"\r\n" + 
			"]}");
	
	public Spotify() {
		super();
		this.setName("spotify");
		this.addWidgets(getSongOf());
		this.addWidgets(getInfo());
	}

	private static Widget getSongOf()
	{
		Widget wid = new Widget();
		wid.setName("track_info");
		wid.setDescription("Affiche les informations d une musique.");
		wid.addParams(new WidgetParam("track_name", "string"));
		return wid;
	}
	
	private static Widget getInfo()
	{
		Widget wid = new Widget();
		wid.setName("album_info");
		wid.setDescription("Affiche les informations d un album.");
		wid.addParams(new WidgetParam("album_name", "string"));
		return wid;
	}
}
