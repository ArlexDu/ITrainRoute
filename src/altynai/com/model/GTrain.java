package altynai.com.model;

import java.util.ArrayList;

public class GTrain {
	private String name;
	private String info;
	private String route;
	private ArrayList<GStation> stops;

	public GTrain() {
		// TODO Auto-generated constructor stub
		route = "line1";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public ArrayList<GStation> getStops() {
		return stops;
	}

	public void setStops(ArrayList<GStation> stops) {
		this.stops = stops;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}


}
