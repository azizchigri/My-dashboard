package com.bbsn.application.services.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SteamService {
	
	public static String getGameInfo(String appId) {
		String url = "http://steamspy.com/api.php?request=appdetails&appid=" + appId;
		RestTemplate rest = new RestTemplate();
		return rest.getForObject(url, String.class);
	}
}
