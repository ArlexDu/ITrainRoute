package altynai.com.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.junit.Test;

import com.sun.scenario.effect.impl.sw.java.JSWBlend_EXCLUSIONPeer;
import com.sun.xml.internal.bind.v2.runtime.unmarshaller.XsiNilLoader.Array;

import altynai.com.model.GArrival;
import altynai.com.model.GDeparture;
import altynai.com.model.GStation;
import altynai.com.model.GTrain;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;





public class ITest {
	
 private ArrayList<GTrain> Gtrains = new ArrayList<GTrain>();
 
 public static SSLContext createIgnoreVerifySSL() throws KeyManagementException, NoSuchAlgorithmException{
	  X509TrustManager tm  = new X509TrustManager() {
			
			@Override
			public X509Certificate[] getAcceptedIssuers() {
				// TODO Auto-generated method stub
				return null;
			}
			
			@Override
			public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
				// TODO Auto-generated method stub
				
			}
			
			@Override
			public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
				// TODO Auto-generated method stub
				
			}
		};
		SSLContext sslContext = SSLContext.getInstance("TLS");
		sslContext.init(null, new TrustManager[]{tm}, null);
		return sslContext;
 }
 
 private static String getStreamAsString(InputStream stream, String charset) throws IOException {
     try {
         BufferedReader reader = new BufferedReader(new InputStreamReader(stream, charset), 8192);
         StringWriter writer = new StringWriter();

         char[] chars = new char[8192];
         int count = 0;
         while ((count = reader.read(chars)) > 0) {
             writer.write(chars, 0, count);
         }

         return writer.toString();
     } finally {
         if (stream != null) {
             stream.close();
         }
     }
 }
 
 public void getTrainInfo(String url) throws Exception{
	 SSLContext sslContext = createIgnoreVerifySSL();
	 Registry<ConnectionSocketFactory> socketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()  
	           .register("http", PlainConnectionSocketFactory.INSTANCE)  
	           .register("https", new SSLConnectionSocketFactory(sslContext))  
	           .build();  
	       PoolingHttpClientConnectionManager connManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);  
	       HttpClients.custom().setConnectionManager(connManager);  
     CloseableHttpClient client = HttpClients.custom().setConnectionManager(connManager).build(); 
	 HttpGet get = new HttpGet(url);
     CloseableHttpResponse response = client.execute(get);
     HttpEntity entity = response.getEntity();
     try{
    	 if(entity!=null){
        	 InputStream inputStream = entity.getContent();
        	 try{
        		 String result = getStreamAsString(inputStream, "UTF-8");
        		 System.out.println(result);
        		 JSONObject whole = JSONObject.fromObject(result);
        		 JSONObject ob = whole.getJSONObject("data");
        		 JSONArray array = ob.getJSONArray("data");
        		 int length = array.length();
        		 System.out.println("length is "+length);
        		 GTrain train = new GTrain();
        		 ArrayList<GStation> stations = new ArrayList<GStation>();
        		 int start = 0;//用于解决起始站点不在上海虹桥的问题
        		 for(int i = 0; i < length ; i++){
        			 JSONObject station = array.getJSONObject(i);
        			 if(i == 0){
        				 train.setName(station.getString("station_train_code"));
        				 train.setInfo(station.getString("start_station_name")+ "——＞" +station.getString("end_station_name"));
        			 }
        			 GStation gstation = new GStation();
        			 if(i==start&&!station.getString("station_name").equals("上海虹桥")){
        				 start++;
        				 continue;
        			 }
        			 if(station.getString("station_name").equals("上海虹桥")){
        				 gstation.setName(station.getString("station_name")+"火车站");
        			 }else{
        				 gstation.setName(station.getString("station_name")+"站");
        			 }
    				 GArrival arrival = new GArrival();
    				 if(!station.getString("arrive_time").equals("----")){
    					 arrival.setTime(station.getString("arrive_time"));
    				 }
    				 GDeparture departure = new GDeparture();
    				 if(!station.getString("arrive_time").equals(station.getString("start_time"))){
    					 departure.setTime(station.getString("start_time"));
    				 }
    				 gstation.setArrival(arrival);
    				 gstation.setDeparture(departure);
    				 stations.add(gstation);
        		 }
        		 train.setStops(stations);
        		 Gtrains.add(train);
        	 }finally{
        		 inputStream.close();
        	 }
         }
     }finally{
    	 response.close();
     }
 }
 //获得trainId文件
 public String GetData(){
	 String filepath = "D:\\Eclipse\\Project_Web\\ITrainRoute\\WebContent\\WEB-LIB\\trainId.json";
	 File file = new File(filepath);
	 StringBuilder result = new StringBuilder();
	 try {
		BufferedReader in = new BufferedReader(new FileReader(file));
		String str;
        while((str = in.readLine())!=null){
            result.append(str);
        }
        in.close();
	 } catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	 }
	 return result.toString();
 }
@Test
 public void getTrainJson(){
	 String str = GetData().trim();
	 JSONObject train = JSONObject.fromObject(str);
	 JSONArray trains = train.getJSONArray("trains");
	 int length = trains.length();
	 for(int i = 0 ; i < length ; i++){
		 JSONObject ob = trains.getJSONObject(i);
		 String train_no = ob.getString("id");
		 String url = "https://kyfw.12306.cn/otn/czxx/queryByTrainNo?train_no="+train_no+"&from_station_telecode=AOH&to_station_telecode=VNP&depart_date=2016-05-03";
		 try {
			getTrainInfo(url);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	 }
	 JSONArray data = JSONArray.fromObject(Gtrains);
	 FileWriter file = null;
	 try {
	 file = new FileWriter("D:\\Eclipse\\Project_Web\\ITrainRoute\\WebContent\\WEB-LIB\\detail.json",false);
	 file.write(data.toString());
	 file.flush();
	 file.close();
	 } catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
	 }finally {
	}
 }
 
}
