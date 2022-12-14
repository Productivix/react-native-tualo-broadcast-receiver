
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTualoBroadcastReceiverSpec.h"

@interface TualoBroadcastReceiver : NSObject <NativeTualoBroadcastReceiverSpec>
#else
#import <React/RCTBridgeModule.h>

@interface TualoBroadcastReceiver : NSObject <RCTBridgeModule>
#endif

@end
