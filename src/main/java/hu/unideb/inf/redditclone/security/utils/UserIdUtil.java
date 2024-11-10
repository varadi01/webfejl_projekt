package hu.unideb.inf.redditclone.security.utils;

import java.util.HashMap;
import java.util.Map;

public class UserIdUtil {

    static Map<String, Long> JwtToUserIdMap = new HashMap<String, Long>();

    static long getUserIdByJwt(String token){
        return JwtToUserIdMap.get(token);
    }

    public static void setRecord(String token, Long userId){
        JwtToUserIdMap.put(token, userId);
        for (var i : JwtToUserIdMap.values()){
            System.out.println(i);
        }
    }

    public static void clearRecord(){
        //TODO
    }

    public static boolean validateUserHasPermission(String authHeader, Long userId){
        //returns true, if the provided uid-token pair exists in the registry
        //therefore allows editing requests to only the owner of the content
        String token = authHeader.substring(7);
        //TODO check expiry of token

        if(JwtToUserIdMap.containsKey(token)){
            return JwtToUserIdMap.get(token).equals(userId);
        }
        return false;
    }
}
