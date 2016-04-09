package altynai.com.model;

public class GStation {
	private String name;
	private GArrival arrival;
	private GDeparture departure;
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public GArrival getArrival() {
		return arrival;
	}

	public void setArrival(GArrival arrival) {
		this.arrival = arrival;
	}

	public GDeparture getDeparture() {
		return departure;
	}

	public void setDeparture(GDeparture departure) {
		this.departure = departure;
	}
	

}
