package com.bbsn.application.services.services;

import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import yahoofinance.Stock;
import yahoofinance.YahooFinance;

@Service
public class CurrencyService {
	
	public static String getExchange(String currency, String date) {
		if (date == null || date.isEmpty())
			return findByCurrency(currency);
		else if (currency == null || currency.isEmpty())
			return findByDate(date);
		else
			return findByDateAndCurrency(currency, date);
	}
	
//	public static Stock test()
//	{
//		Stock stock = null;
//		try {
//			stock = YahooFinance.get("INTC");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return stock;
//	}
	
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
