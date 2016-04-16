package altynai.com.tools;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpEntity;
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

public class TrainsInfomation {
	private String url = "https://kyfw.12306.cn/otn/czxx/queryByTrainNo?train_no=5l0000G10250&from_station_telecode=AOH&to_station_telecode=VNP&depart_date=2016-05-03";
	 
	 
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
	 
	 public static String getStreamAsString(InputStream stream, String charset) throws IOException {
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
	 @Test
	 public void getTrainInfo() throws Exception{
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
	        		 System.out.println(getStreamAsString(inputStream, "UTF-8"));
	        	 }finally{
	        		 inputStream.close();
	        	 }
	         }
	     }finally{
	    	 response.close();
	     }
		 
	 }
	 
	 //获取当前系统的时间
	 private String getDate(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String date = df.format(new Date());
		return date;
	 }
}
