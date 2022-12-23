package com.tualobroadcastreceiver

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise


import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.ConnectivityManager


import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule

import android.util.Log
import android.widget.Toast

class TualoBroadcastReceiverModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val rContext: ReactApplicationContext = reactContext
  private val broadCastReceiver = object : BroadcastReceiver() {

      override fun onReceive(context: Context, intent: Intent) {   

        val params = Arguments.createMap()
        val bundle = intent.getExtras()
        if (bundle != null) {
          val keyList = bundle.keySet()
          keyList.forEach {  
            val o = bundle.get(it)
            if (o is String) params.putString(it,o)
            if (o is Int) params.putInt(it,o)
          }
        }
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(intent.action.toString(), params)

      }
  }

  override fun getName(): String {
    return NAME
  }



  @ReactMethod
  fun register( intentFilter: ReadableArray ) {


      val listenToBroadcastsFromOtherApps = true
      /*
      val receiverFlags = if (listenToBroadcastsFromOtherApps) {
          ReactApplicationContext.RECEIVER_EXPORTED
      } else {
          ReactApplicationContext.RECEIVER_NOT_EXPORTED
      }
      */
      val filter = IntentFilter()
      for (index in 0..(intentFilter.size()-1)) {
        val readableType = intentFilter.getType(index);
        if (readableType==ReadableType.String) filter.addAction(intentFilter.getString(index))
      }
      // intentFilter.forEach { filter.addAction(it) }

      rContext.registerReceiver( broadCastReceiver, filter)

  }

  @ReactMethod
  fun unregister( ) {
    rContext.unregisterReceiver( broadCastReceiver )
  }

  @ReactMethod
  fun addListener(eventName: String?) {
      // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int?) {
      // Keep: Required for RN built in Event Emitter Calls.
  }


  companion object {
    const val NAME = "TualoBroadcastReceiver"
  }


}
