package com.bbsn.application.about;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/about.json")
public class AboutController {

	private String getClientIp(HttpServletRequest request)
	{
		String ip = "";
		if (request != null) {
			ip = request.getHeader("X-FORWARDED-FOR");
            if (ip  == null || "".equals(ip)) {
            	ip  = request.getRemoteAddr();
            }
        }
		return ip;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody About processData(HttpServletRequest request) {
			About about = new About();
			about.client.host = getClientIp(request);
			about.server.current_time = System.currentTimeMillis() / 1000L;
	        return about;
	    }
}
