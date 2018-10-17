package com.bbsn.application.about;


import java.util.List;

import com.bbsn.application.services.model.Services;

public class About {
	public class Client {
		public String host = "";
	}
	
	public class Server {
		
		public Long current_time;
		
		public List<Services> services;
	}
	
	public Client client = new Client();
	
	public Server server = new Server();
}
