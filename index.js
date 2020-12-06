var stepTime = 1100;
var giftData = {};
function printStack() {
    Java.perform(function () {
        var Exception = Java.use("java.lang.Exception");
        var ins = Exception.$new("Exception");
        var straces = ins.getStackTrace();
        if (straces != undefined && straces != null) {
            var strace = straces.toString();
            var replaceStr = strace.replace(/,/g, "\r\n");
            console.log("=============================Stack strat=======================");
            console.log(replaceStr);
            console.log("=============================Stack end=======================\r\n");
            Exception.$dispose();
        }
    });
}
function hookActivity(){
    const Activity = Java.use('android.app.Activity');
    Activity.onResume.implementation = function () {
      console.log(this);
      this.onResume();
    };
    // Java.choose('com.yxcorp.gifshow.detail.PhotoDetailActivity',{
    //     onMatch:function(instance){
    //         console.log(instance);
    //         console.log(instance.e.value);
    //         const url = instance.getUrl();
    //         console.log(url);
    //         const param = instance.e.value;
    //         const commonParam = param.getDetailCommonParam();
    //         console.log(commonParam);
    //         const playConfig = param.getDetailPlayConfig();
    //         console.log(playConfig);
    //         const photo = param.getPhoto();
    //         console.log(photo);
    //         console.log(photo.isVideoType()); 
    //         const playConfig = photo.getLivePlayConfig();
    //         console.log(playConfig);

    //         console.log(playConfig.getHorseRace());
    //         console.log(playConfig.getAudioOnlyPlayUrls().size());
    //         console.log(photo.isLiveStream());


    //     },
    //     onComplete:function(){
    //         console.log('查找完毕');
    //     }
    // });

    const hongBaoService = Java.use('j.c.a.a.a.g2.a0.h0');
    hongBaoService.a.overload('j.c.a.a.a.g2.a0.r0.d').implementation=function(){
        console.log(JSON.stringify(arguments));
        console.log(this);
        console.log(this.m.value);
        console.log(JSON.stringify(this.m.value));
        return this.a.apply(this,arguments);
    }
    const LiveRedPacketSnatchDialogFragment = Java.use('com.kuaishou.live.core.show.redpacket.snatch.LiveRedPacketSnatchDialogFragment');
    LiveRedPacketSnatchDialogFragment.Y2.implementation = function(){
        console.log('y2!!!!');
        
        console.log(this.w.value);
        // console.log('阻止y2');
        return this.Y2.apply(this,arguments);
    }

    const q = Java.use('j.c.a.a.a.g2.a0.u0.q');
    const e = Java.use('j.c.a.a.a.g2.a0.u0.q$e');
    const vi = Java.use('c1.c.k0.d');
    e.c.overload().implementation = function(){
        console.log('阻止c'); // 阻止之后红包转不动了 所以 这个肯定能发出抢的指令
        // return vi.$new();
        console.log(q.this);
        return this.c.apply(this,arguments);
    }
    

    const manager = Java.use('j.c.a.a.a.g2.a0.o0');
    manager.a.overload('j.c.a.a.a.g2.a0.r0.f', 'java.lang.String', 'j.c.a.a.a.g2.a0.r0.g').implementation = function(){
        console.log('设置红包结果');
        printStack();
        return this.a.apply(this,arguments);
    }

    manager.a.overload('com.kuaishou.livestream.message.nano.LiveRedPackMessage$AudienceRedPackToken').implementation = function(){
        console.log('preload token');
        printStack();
        return this.a.apply(this,arguments);
    }

    manager.a.overload('java.lang.String', 'java.lang.String').implementation = function(){
        console.log('a(m,str)');
        // printStack();
        console.log(JSON.stringify(arguments));
        return this.a.apply(this,arguments);
    }

    manager.a.overload('java.lang.String', 'j.c.a.a.a.g2.a0.r0.e').implementation = function(){
        console.log('grab result');
        // printStack();
        console.log(JSON.stringify(arguments));
        const ret = arguments[1];
        console.log('是否抢到红包:'+ret.mIsGrabbed.value);
        console.log('礼物列表:'+ret.mGiftList.value.size());
        if(ret.mIsGrabbed.value){
            console.log('礼物价值:'+ret.mDisplayTotalCoin.value);
            var timeList = giftData[ret.mDisplayTotalCoin.value];
            if(!timeList){
                timeList = [];
                giftData[ret.mDisplayTotalCoin.value] = timeList;
            }
            timeList.push(stepTime);
        }
        return this.a.apply(this,arguments);
    }

    const i1 = Java.use('j.c.a.a.a.k1.n1.k0.i1');
    i1.a.overload('com.kuaishou.client.log.content.packages.nano.ClientContent$LiveStreamPackage', 'j.c.a.a.a.g2.a0.r0.d', 'j.c.a.a.a.g2.a0.r0.e', 'int').implementation = function(){
        
        printStack();
        console.log(JSON.stringify(arguments));
        if(arguments[3]==8){
            const ret = this.a.apply(this,arguments);
            if(gloabDialogFragment){
                setTimeout(function(){
                    Java.perform(function(){
                        console.log('x:'+gloabDialogFragment.x.value);
                        Java.scheduleOnMainThread(function(){
                            gloabDialogFragment.B.value.n();
                            // setTimeout(function(){
                            //     Java.perform(function(){
                            //         Java.scheduleOnMainThread(function(){
                                        
                            //             LiveRedPacketSnatchDialogFragment.dismissAllowingStateLoss();
                            //         });    
                            //     });
                            // },1000);
                        });
                    });
                },200);
            }
            return ret;
        }else{
            return this.a.apply(this,arguments);
        }
    }

    // const Log = Java.use('com.kwai.sdk.debuglogger.DebugLogger');
    // Log.syncAddLog.implementation = function(){
        
    //     // if(arguments[2]=='onSnatchRedPacketViewClick'){
    //         console.log(arguments[2]);
    //     // }
    //     return this.syncAddLog.apply(this,arguments);
    // }

    const LiveRedPackSnatchViews = Java.use('com.kuaishou.live.core.show.redpacket.widget.LiveRedPackSnatchView$a');
    // LiveRedPackSnatchViews.a.implementation = function(){
    //     console.log('shi yi shi 1!!');
    //     return this.a.apply(this,arguments);
    // }

    // const packLis = Java.use('j.c.a.a.a.g2.e0.f0$a');
    // packLis.b.implementation = function(){
    //     console.log(this);
    //     console.log('回调');
    //     // console.log()
    //     return this.b.apply(this,arguments);
    // }


    Java.choose('j.c.a.a.a.g2.a0.o0',{
        onMatch:function(instance){
            console.log(instance);
            console.log(instance.b.value);
            console.log('找到manager');
        },
        onComplete:function(){
            console.log('找到manager完毕');
        }
    });

    // Java.choose('com.kuaishou.live.core.show.redpacket.snatch.LiveRedPacketSnatchDialogFragment',{
    //     onMatch:function(instance){
    //         console.log('找到 LiveRedPacketSnatchDialogFragment');
    //         console.log(instance);
    //         // if()
    //         // instance.x.value = 1;

    //         // instance.Y2();
    //         startOpenPack(instance);
    //         // instance.Y2();
    //         // instance.Y2();
    //     },
    //     onComplete:function(){
    //                 console.log('找到LiveRedPacketSnatchDialogFragment完毕');
    //             }
    // })

    
    // Java.choose('j.c.a.a.a.g2.a0.u0.q$e',{
    //     onMatch:function(instance){
    //         console.log(instance);
    //         instance.c();
    //         console.log('找到j.c.a.a.a.g2.a0.u0.q$e');
    //     },
    //     onComplete:function(){
    //         console.log('找到j.c.a.a.a.g2.a0.u0.q$e完毕');
    //     }
    // });
    


    // Java.choose('j.c.a.a.a.g2.a0.h0',{
    //     onMatch:function(instance){
    //         console.log(instance);
    //         console.log(instance.j.value);
    //         console.log(instance.j.value.n());

    //         const packIds = instance.o.value;
    //         console.log('有几个红包:'+packIds.size());
    //     },
    //     onComplete:function(){
    //         console.log('查找j.c.a.a.a.g2.a0.h0完毕');
    //     }
    // })
    // Java.choose('com.kuaishou.livestream.message.nano.LiveRedPackMessage$AudienceRedPack',{
    //     onMatch:function(instance){
    //         console.log('红包对象?');
    //         // console.log(instance);
            
    //         const grabTime = instance.grabTime.value;
    //         const now = Date.now();
    //         console.log(grabTime);
    //         console.log(now);
    //         if(grabTime-now>0){
    //             grab(instance);
    //         }
    //     },
    //     onComplete:function(){
    //         console.log('查找红包完毕');
    //     }
    // });
    const ElementPackage = Java.use('com.kuaishou.client.log.event.packages.nano.ClientEvent$ElementPackage');
    const ContentPackage = Java.use('com.kuaishou.client.log.content.packages.nano.ClientContent$ContentPackage');
    const RedPackPackage = Java.use('com.kuaishou.client.log.content.packages.nano.ClientContent$RedPackPackage');
    function startGrabTask(redPack){
        const now = Date.now();
        const grabTime = instance.grabTime.value;
        if(grabTime-now>0){
            if(grabTime-now<1000){ //小于1s时 开始抢
                const element = ElementPackage.$new();
                const content = ContentPackage.$new();
                const redPackPackage = RedPackPackage.$new();
                element.action2.value = 'RED_PACK_CLICK';

                setTimeout(function(){
                    startGrabTask(redPack);
                },10);
            }else{
                setTimeout(function(){
                    startGrabTask(redPack);
                },200);
            }
        }
    }
    function grab(redPack){
        const redPackId = redPack.redPackId.value;
        console.log(redPackId+': 开始抢');
        // startGrabTask(redPack);
    }
    // Java.choose('j.c.a.a.a.g2.a0.r0.d',{
    //     onMatch:function(instance){
    //         console.log('红包对象?');
    //         console.log(instance);
    //         console.log(instance.b.value);
    //         console.log(instance.d.value);
    //         console.log(instance.e.value);
    //         console.log(instance.a());
    //         console.log(Date.now());
    //         console.log(instance.a() - Date.now());
    //         if(instance.a() - Date.now()>0){
    //             console.log('这个红包可以抢');
    //         }
    //     },
    //     onComplete:function(){
    //         console.log('查找红包完毕');
    //     }
    // })
}
var gloabDialogFragment = null;
function startOpenPack(LiveRedPacketSnatchDialogFragment,isFromDialog){
    // console.log("x:"+LiveRedPacketSnatchDialogFragment.x.value);
    // if(LiveRedPacketSnatchDialogFragment.x.value==0){
    //     LiveRedPacketSnatchDialogFragment.x.value=1;
    // }
    if(LiveRedPacketSnatchDialogFragment.x.value==1){
        // LiveRedPacketSnatchDialogFragment.Y2();
        const time = LiveRedPacketSnatchDialogFragment.w.value.d();
        // console.log("time:"+time);
        // console.log("packId:"+LiveRedPacketSnatchDialogFragment.w.value.j())
        const delay = time - 5000;
        if(delay<0){
            delay = 5;
        }
        if(time>stepTime){
            setTimeout(function(){
                Java.perform(function(){
                    startOpenPack(LiveRedPacketSnatchDialogFragment,true);
                });
            },delay);
        }else{
            gloabDialogFragment = LiveRedPacketSnatchDialogFragment;
            LiveRedPacketSnatchDialogFragment.Y2();
            setTimeout(function(){
                Java.perform(function(){
                    LiveRedPacketSnatchDialogFragment.dismissAllowingStateLoss();
                    findLiveFellowRedPacketFloatView();
                    
                });
            },6000)
        }
        
    }else if(isFromDialog){ // 是从x=1来的 x突然不等1 说明要么dialog被关掉了，要么直播被关掉了，要么红包已经被拆了
        // 这种情况下 都需要隔断时间开始下一次循环 暂时定为1分钟
        setTimeout(function(){
            Java.perform(function(){
                findLiveFellowRedPacketFloatView();
            });
        },60000)
    }
}

function scanDialog(){
    Java.choose('com.kuaishou.live.core.show.redpacket.snatch.LiveRedPacketSnatchDialogFragment',{
        onMatch:function(instance){
            console.log('找到 LiveRedPacketSnatchDialogFragment');
            console.log(instance);
            startOpenPack(instance);
        },
        onComplete:function(){
            console.log('找到LiveRedPacketSnatchDialogFragment完毕');
        }
    })
}

function openGiftPack(){
    const hongBaoService = Java.use('j.c.a.a.a.g2.a0.h0');
    hongBaoService.a.overload('j.c.a.a.a.g2.a0.r0.d').implementation=function(){
        console.log("有红包打开，重新扫描dialog！");
        // printStack();
        setTimeout(function(){
            Java.perform(function(){
                scanDialog();
            })
        },1000);
        return this.a.apply(this,arguments);
    }
}

function getRect(view){
    const Rect  = Java.use('android.graphics.Rect');
    const rect = Rect.$new();
    view.getGlobalVisibleRect(rect);
    return rect;
}

function findLiveFellowRedPacketFloatView(){
    var openNum = 0;
    Java.choose('com.kuaishou.live.core.show.redpacket.fellowredpacket.widget.LiveFellowRedPacketFloatView',{
        onMatch:function(instance){
            console.log('找到 LiveFellowRedPacketFloatView');
            console.log(instance);
            // startOpenPack(instance);
            console.log("isShow:"+instance.isShown());
            // console.log("getMaxDisplayCount:"+instance.getMaxDisplayCount());
            // console.log("getCurrentDisplayCount:"+instance.getCurrentDisplayCount());
            console.log("红包信息:"+instance.getRedPackInfo());
            console.log("倒计时:"+instance.g.values);
            const rect = getRect(instance);
            const top = rect.top.value;
            const bottom = rect.bottom.value;
            // console.log("top:"+rect.top.value);
            // console.log("bottom:"+rect.bottom.value);
            if(instance.getRedPackInfo()!=null && instance.isShown()&& top>0 &&bottom<2200){
                try{
                    instance.j.value.a(instance.getRedPackInfo());
                    openNum+=1;
                }catch(e){
                    console.log(e);
                }
            }
        },
        onComplete:function(){
            console.log('找到LiveFellowRedPacketFloatView完毕');
            console.log('giftData-------------------');
            console.log(JSON.stringify(giftData));
            console.log('当前时间:'+Date.now());
            console.log('giftData-------------------');
            if(openNum==0){
                console.log('当前直播间没有红包了，换个直播间吧！');
                slideNextpage();
                setTimeout(function(){
                    Java.perform(function(){
                        findLiveFellowRedPacketFloatView();
                    });
                },6000);
            }
        }
    })
}

var slidePlayViewPager = null;
function slideNextpage(){
    Java.perform(function(){
        function goNext(){
            if(slidePlayViewPager.hasMore()){
                Java.scheduleOnMainThread(function(){
                    slidePlayViewPager.d(true);
                });
            } 
        }
        if(slidePlayViewPager){
            goNext();
        }else{
            Java.choose('com.yxcorp.plugin.live.widget.LiveSlideViewPager',{
                onMatch:function(instance){
                    console.log(instance);
                    console.log('找到LiveSlideViewPager');
                    slidePlayViewPager = instance;
                    goNext();
                },
                onComplete:function(){
                    console.log('查找LiveSlideViewPager完毕')
                }
            });
        }
    });
}

function hookRedPacketResult(){
    
    // Java.choose('com.kuaishou.live.core.show.redpacket.fellowredpacket.model.LiveFellowRedPacketLuckyUsersResponse',{
    //     onMatch:function(instance){
    //         console.log(instance);
    //         console.log('找到LiveFellowRedPacketLuckyUsersResponse');
    //         const size = instance.getItems().size();
    //         console.log('size:'+size);
    //     },
    //     onComplete:function(){
    //         console.log('查找LiveFellowRedPacketLuckyUsersResponse完毕')
    //     }
    // });

    const LiveFellowRedPacketLuckyUsersResponse = Java.use('com.kuaishou.live.core.show.redpacket.fellowredpacket.model.LiveFellowRedPacketLuckyUsersResponse');
    LiveFellowRedPacketLuckyUsersResponse.getItems.implementation = function(){
        const list = this.getItems.apply(this,arguments);
        console.log('size:'+list.size());
        if(list.size()>24){
            stepTime+=5;
            console.log('红包慢了，stepTime+5:'+stepTime);
        }else{
            stepTime-=10;
            console.log('红包快了，stepTime-10:'+stepTime);
        }
        return list;
    }
    // const e = Java.use('j.c.a.a.a.g2.a0.u0.q$e');
    // e.d.implementation = function(){
    //     console.log(JSON.stringify(arguments));
    //     return this.d.apply(this,arguments);
    // }

}

function main(){
    hookActivity();
    openGiftPack();
    findLiveFellowRedPacketFloatView();
    hookRedPacketResult();
}

setTimeout(function(){
    Java.perform(function(){
      main();  
    })
});