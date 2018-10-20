package com.bbsn.application.services.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.stream.Collectors;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SpotifyService {
	
	private static String connect()
	{
		URL url;
		HttpURLConnection con = null;
		try {
			url = new URL("https://accounts.spotify.com/api/token");
			con = (HttpURLConnection) url.openConnection();
			con.setDoOutput(true);
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			con.setRequestProperty("Authorization", "Basic NGNiZDYyMGFmNWM3NGEzOGFmYzg1ODJmMmEyNzVlMWI6NDNhMWMyZTdmMzA3NGM5OThmZmViZTA5NzE5ZTZmZTU=");
			OutputStream os = con.getOutputStream();
			os.write("grant_type=client_credentials".getBytes("UTF-8"));
			os.close();
			con.connect();
			BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
			return br.lines().collect(Collectors.joining());
		} catch (IOException e) {
			return "Can not connect";
		}	
	}
	
	private static String getTrack(String auth, String request) throws JSONException, IOException
	{
		URL url;
		HttpURLConnection con = null;
		url = new URL("https://api.spotify.com/v1/search" + request);
		con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("Accept", "application/json");
		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Authorization", auth);
		con.connect();
		BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
		return br.lines().collect(Collectors.joining());
	}
	
	private static String buildRequest(JSONObject body) throws JSONException
	{
		String request = "?q=" + body.getString("keyword").replace(' ', '+') + "&";
		request += "type=" + body.getString("type");
		if (body.has("market"))
			request += "&market=" + body.getString("market");
		if (body.has("limit"))
			request += "&limit=" + body.getString("limit");
		return request;
	}
	
	public static String getData(String bodySource) throws IOException, JSONException
	{	
		JSONObject body = new JSONObject(bodySource);
		if (!body.has("keyword") || !body.has("type"))
			throw new JSONException("Missing keyword or type");
		JSONObject json = new JSONObject(connect());
		String auth = json.getString("token_type") + " " + json.getString("access_token");
		String request = buildRequest(body);
		return getTrack(auth, request);
	}
}
