package altynai.com.action;

import java.util.HashMap;

import com.opensymphony.xwork2.ActionSupport;

import altynai.com.tools.Weather;

public class Getweather extends ActionSupport {

	private HashMap<String, Object> data;
//	经度
	private String lat;
//	纬度
	private String lon;
	
	private Weather weather;
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
	   data = new HashMap<String,Object>();
//	   System.out.println("Get Weather");
       weather = new Weather();
       String info = weather.getInfo(lat, lon);
       data.put("weather", info);
       return"success";
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
	public void setData(HashMap<String, Object> data) {
		this.data = data;
	}
	public String getLon() {
		return lon;
	}
	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}
	
	
	
}
