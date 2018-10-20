package com.bbsn.application.services.model;

import javax.persistence.Entity;

import org.json.JSONObject;
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
		this.setName("currency_exchange");
		this.addWidgets(getExchangeWidget());
	}
	
	private static Widget getExchangeWidget()
	{
		Widget wid = new Widget();
		wid.setName("currency_exchange");
		wid.setDescription("Recuperer le taux de change d'une monnaie");
		wid.addParams(new WidgetParam("currency", "string"));
		wid.addParams(new WidgetParam("date", "string"));
		return wid;
	}
}
