package com.bbsn.application.services.model;

import javax.persistence.Entity;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.web.client.RestTemplate;

import com.bbsn.application.services.widgets.model.Widget;
import com.bbsn.application.services.widgets.model.WidgetParam;


@Entity
public class CurrencyExchange extends Services {
		
	public final static JSONObject CURRENCY_LIST = new JSONObject("{" +
			"  \"USD\": \"United States Dollar\",\r\n" +
			"  \"JPY\": \"Japanese Yen\",\r\n" +
			"  \"BGN\": \"Bulgarian Lev\",\r\n" +
			"  \"CZK\": \"Czech Republic Koruna\",\r\n" +
			"  \"DKK\": \"Danish Krone\",\r\n" +
			"  \"GBP\": \"British Pound Sterling\",\r\n" +
			"  \"HUF\": \"Hungarian Forint\",\r\n" +
			"  \"PLN\": \"Polish Zloty\",\r\n" +
			"  \"RON\": \"Romanian Leu\",\r\n" +
			"  \"SEK\": \"Swedish Krona\",\r\n" +
			"  \"CHF\": \"Swiss Franc\",\r\n" +
			"  \"ISK\": \"Icelandic Krona\",\r\n" +
			"  \"NOK\": \"Norwegian Krone\",\r\n" +
			"  \"HRK\": \"Croatian Kuna\",\r\n" +
			"  \"RUB\": \"Russian Ruble\",\r\n" +
			"  \"TRY\": \"Turkish Lira\",\r\n" +
			"  \"AUD\": \"Australian Dollar\",\r\n" +
			"  \"BRL\": \"Brazilian Real\",\r\n" +
			"  \"CAD\": \"Canadian Dollar\",\r\n" +
			"  \"CNY\": \"Chinese Yuan\",\r\n" +
			"  \"HKD\": \"Hong Kong Dollar\",\r\n" +
			"  \"IDR\": \"Indonesian Rupiah\",\r\n" +
			"  \"ILS\": \"Israeli New Sheqel\",\r\n" +
			"  \"INR\": \"Indian Rupee\",\r\n" + 
			"  \"KRW\": \"South Korean Won\",\r\n" +
			"  \"MXN\": \"Mexican Peso\",\r\n" +
			"  \"MYR\": \"Malaysian Ringgit\",\r\n" +
			"  \"NZD\": \"New Zealand Dollar\",\r\n" +
			"  \"PHP\": \"Philippine Peso\",\r\n" +
			"  \"SGD\": \"Singapore Dollar\",\r\n" +
			"  \"THB\": \"Thai Baht\",\r\n" +
			"  \"ZAR\": \"South African Rand\",\r\n" +
			"}");
	
	public CurrencyExchange() {
		super();
		Widget temperature = getExchangeWidget();
		this.setName("currency_exchange");
		this.addWidgets(temperature);
	}
	
	public static Widget getExchangeWidget()
	{
		Widget wid = new Widget();
		wid.setName("currency_exchange");
		wid.setDescription("Recuperer le taux de change d'une monnaie");
		WidgetParam param = new WidgetParam();
		param.setName("currency");
		param.setType("string");
		wid.addParams(param);
		WidgetParam paramDate = new WidgetParam();
		paramDate.setName("date");
		paramDate.setType("string");
		wid.addParams(paramDate);
		return wid;
	}
	
	public static String getExchange(String currency, String date) {
		if (date == null || date.isEmpty())
			return findByCurrency(currency);
		else if (currency == null || currency.isEmpty())
			return findByDate(date);
		else
			return findByDateAndCurrency(currency, date);
	}
	
	private static String findByCurrency(String currency)
	{
		String url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
		RestTemplate rest = new RestTemplate();
		String response = rest.getForObject(url, String.class);
		JSONObject json = XML.toJSONObject(response);
		JSONObject envelope = (JSONObject) json.get("gesmes:Envelope");
		envelope = (JSONObject) envelope.get("Cube");
		envelope = (JSONObject) envelope.get("Cube");
		JSONArray result = (JSONArray) envelope.get("Cube");
		for (Object money : result) {
			JSONObject tmp = (JSONObject) money;
			if (tmp.get("currency").equals(currency))
				return tmp.toString();
		}
		return "Currency not found";
	}
	
	private static String findByDate(String date)
	{
		String url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";
		RestTemplate rest = new RestTemplate();
		String response = rest.getForObject(url, String.class);
		JSONObject json = XML.toJSONObject(response);
		JSONObject envelope = (JSONObject) json.get("gesmes:Envelope");
		envelope = (JSONObject) envelope.get("Cube");
		JSONArray result = (JSONArray) envelope.get("Cube");
		for (Object money : result) {
			JSONObject tmp = (JSONObject) money;
			if (tmp.get("time").equals(date))
				return tmp.get("Cube").toString();
		}
		return "Currency not found";
	}
	
	private static String findByDateAndCurrency(String currency, String date)
	{
		JSONArray array = new JSONArray(findByDate(date));
		
		for (Object money : array)
		{
			JSONObject tmp = (JSONObject) money;
			if (tmp.get("currency").equals(currency))
				return tmp.toString();
		}
		return "Currency not found";
	}
}
