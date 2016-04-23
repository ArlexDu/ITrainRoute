package altynai.com.tools;

import java.io.IOException;
import java.io.InputStream;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.junit.Test;

import com.sun.org.apache.xalan.internal.xsltc.compiler.sym;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Weather {
//	天气api
//	http://openweathermap.org/
	public String getInfo(String lat, String lon) {
		CloseableHttpClient client = HttpClients.createDefault();
		HttpGet get = new HttpGet("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon+"&appid=c66e75bbaf301fb512c2f6354ac66f57");
		CloseableHttpResponse response = null;
		try {
			response = client.execute(get);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				InputStream inputStream = entity.getContent();
				String info = TrainsInfomation.getStreamAsString(inputStream, "UTF-8");
//				System.out.println(info);
				JSONObject object = JSONObject.fromString(info);
				JSONArray weather = object.getJSONArray("weather");
				String mainweather = weather.getJSONObject(0).getString("main");
				return mainweather;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "null";
		} finally {
			try {
				response.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return "null";

	}
}
