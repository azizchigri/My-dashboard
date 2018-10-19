package com.bbsn.application.services.model;

import javax.persistence.Entity;

import org.json.JSONObject;

import com.bbsn.application.services.widgets.model.Widget;
import com.bbsn.application.services.widgets.model.WidgetParam;

@Entity
public class Steam extends Services {

	public final static JSONObject GAME_LIST = new JSONObject("{" +
			"  \"PAYDAY 2\": \"218620\",\r\n" +
			"  \"Borderlands 2\": \"49520\",\r\n" +
			"  \"Just cause 3\": \"225540\",\r\n" +
			"  \"Just dance 2017\": \"446560\",\r\n" +
			"  \"Dark Souls III\": \"374320\",\r\n" +
			"  \"Deus Ex: Mankind Divided\": \"337000\",\r\n" +
			"  \"Farming Simulator 19\": \"787860\",\r\n" +
			"  \"Overcooked! 2\": \"728880\",\r\n" +
			"  \"Tom Clancy's Rainbow Six Siege\": \"359550\",\r\n" +
			"  \"Portal 2\": \"620\",\r\n" +
			"  \"Half-Life 2: Deathmatch\": \"320\",\r\n" +
			"  \"Undertale\": \"391540\",\r\n" +
			"  \"Clustertruck\": \"397950\",\r\n" +
			"  \"Factorio\": \"427520\",\r\n" +
			"  \"NieR:Automata\": \"524220\",\r\n" +
			"  \"MONSTER HUNTER: WORLD\": \"582010\",\r\n" +
			"  \"Assassin's Creed Odyssey\": \"812140\",\r\n" +
			"  \"Mirror's Edge\": \"17410\",\r\n" +
			"  \"Life is Strange\": \"319630\",\r\n" +
			"  \"Tom Clancy's Splinter Cell: Chaos Theory\": \"13570\",\r\n" +
			"}");
	
	public Steam() {
		super();
		Widget temperature = getExchangeWidget();
		this.setName("steam");
		this.addWidgets(temperature);
	}
	
	public static Widget getExchangeWidget()
	{
		Widget wid = new Widget();
		wid.setName("game_info");
		wid.setDescription("Recuperer les informations sur un jeu");
		WidgetParam param = new WidgetParam();
		param.setName("appId");
		param.setType("string");
		wid.addParams(param);
		return wid;
	}
}
