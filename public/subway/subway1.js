;(function(global, undefined) {
    "use strict"
    var _global,panZoom,state,time,func,hot = [],arrowHref = 'http://172.51.216.72:41004/subway/arrow.png',turnHref= 'http://172.51.216.72:41004/subway/turn.png',Num = 0,stationPath = [];

    function loadJS( url, callback ){
        var script = document.createElement('script'),
            fn = callback || function(){};
        script.type = 'text/javascript';
        //IE
        if(script.readyState){
            script.onreadystatechange = function(){
                if( script.readyState == 'loaded' || script.readyState == 'complete' ){
                    script.onreadystatechange = null;
                    fn();
                }
            };
        }else{
            //其他浏览器
            script.onload = function(){
                fn();
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function tct_subway(opt){
        var self = this
        // loadJS('http://172.51.216.72:41004/subway/jquery.min.js',function(){
            loadJS('http://172.51.216.72:41004/subway/svg-pan-zoom.min.js',function(){
                self._initial(opt);
            })
        // });
    }
    
    tct_subway.prototype = {
        constructor: this,
        xml:null,
        id:null,
        showfull:false,
        _initial:function(opt){
            var _self = this
            this.__proto__.id = opt.tmpId
            this._generate('g',{'id':'subwayMain'},opt.tmpId)
            // if(opt.fullload) {
            this.__proto__.showfull = true
            var btn = "<div class='fullLoadBtn'><span class='sub sub1'>舒适</span><span class='sub sub2'>较舒适</span><span class='sub sub3'>轻度拥挤</span><span class='sub sub4'>拥挤</span></div>"
            $('#' + opt.tmpId).after(btn)
            // $('.parent').on('click',function(){
            //     $('.btn').stop().animate({
            //         width:$('.btn').width() == 87 ? 415 : 87
            //     },300,function(){
            //         _self.clearFlyLine()
            //         if($('.btn').width() == 87){
            //             $('#normal').show()
            //             $('#fullLoad').hide()
            //         }else{
            //             $('#normal').hide()
            //             $('#fullLoad').show()
            //         }    
            //     })
            // })
            // }
            $.ajax({
                // url: "beijing.xml",
                url: "http://172.51.216.72:41004/subway/beijing.xml?" + Math.floor(Math.random()*1000),
                dataType: 'xml',
                type: 'GET',
                timeout: 5000,
                error: function(xml){
                    alert("加载XML文件出错！");
                },
                success: function(xml){
                    _self.__proto__.xml = xml;
                    _self._generate('g',{'id':'normal','class':'normal'},'subwayMain')
                    _self._generate('g',{'id':'image'},'subwayMain')
                    
                    _self._generate('g',{'id':'fullLoad'},'subwayMain')
                    _self._generate('g',{'id':'lineName'},'subwayMain')
                    _self._generate('g',{'id':'stationPoint'},'subwayMain')
                    _self._generate('g',{'id':'stationName'},'subwayMain')
                    _self._generate('g',{'id':'alarm'},'subwayMain')
                    _self._generate('g',{'id':'stop'},'subwayMain')
                    _self._generate('g',{'id':'arrow'},'subwayMain')
                    _self._generate('g',{'id':'HeatMap'},'subwayMain')
                    _self._generate('g',{'id':'Passengerflow'},'subwayMain')
                    _self._generate('g',{'id':'alarMain'},'subwayMain')
                    _self._getLine()
                }
            });
        },
        _getLine:function(){
            var _self = this
            $(this.xml).find('l').each(function(){
                var self = this
                _self._drewStation(this.attributes)
                for (let index = 0; index < this.children.length; index++) {
                    if(this.children[index].attributes.acc.value){//描绘点位
                        _self._drewStationPoint(self.attributes,this.children[index].attributes)
                        _self._drewStationName(self.attributes,this.children[index].attributes)
                        if(index < this.children.length - 1){
                            if(_self.showfull){
                                _self._drewFullLoad(self.attributes,this.children,index,index + 1)
                            }
                        }
                    }
                    if(this.children[index].attributes.arc){//描绘曲线
                        _self._drewCurve(self.attributes,this.children,index,index + 1)
                    }else{
                        if(index < this.children.length - 1){//描绘直线
                            _self._drewLine(self.attributes,this.children,index,index + 1)
                        }
                    }
                }
                if(this.attributes.loop.value == 'true'){//回环补全一站
                    _self._drewLine(this.attributes,this.children,this.children.length - 1,0)
                    if(_self.showfull){
                        _self._drewFullLoad(this.attributes,this.children,this.children.length - 1,0)
                    }
                }
            })
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/tam.png','width':85,'height':26,'x':908,'y':758,'class':'tam'},'image')
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/north.png','width':50,'height':100,'x':1710,'y':250,'class':'cluster'},'image')
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/airport.png','width':40,'height':40,'x':1510,'y':355,'class':'cluster'},'image')
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/airport.png','width':40,'height':40,'x':1000,'y':1228,'class':'cluster'},'image')
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/birde.png','width':80,'height':40,'x':940,'y':480,'class':'cluster'},'image')
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/jump.png','width':45,'height':40,'x':248,'y':770,'class':'cluster'},'image')

            panZoom = svgPanZoom('#subway',{zoomEnabled: true,dblClickZoomEnabled:false,minZoom:.3,maxZoom:4,fit:false});
            panZoom.pan({x:($('.Line').width() - 1860) / 2,y:($('.wirenetwork').height() - 1500) / 2})
            panZoom.zoom(1)
            console.log(panZoom);
            
        },
        _drewLine:function(parent,data,index,next){
            this._generate('line',{'id':data[index].attributes.acc.value,'x1':data[index].attributes.x.value,'y1':data[index].attributes.y.value,'x2':data[next].attributes.x.value,'y2':data[next].attributes.y.value,'stroke':parent.lc.nodeValue.replace("0x", "#"),'stroke-width':5,'stroke-linejoin':'round','stroke-linecap':'round','lineId':Number(parent.lcode.value),'class':'cluster ' + Number(parent.lcode.value)},'normal')
        },
        _drewCurve:function(parent,data,index,next) {
            this._generate('path',{'id':data[index].attributes.acc.value,'d':'M' + data[index].attributes.x.value + ' ' + data[index].attributes.y.value + ' Q' +  data[index].attributes.arc.value.replace(":", " ") + ' ' + data[next].attributes.x.value + ' ' + data[next].attributes.y.value,'stroke':parent.lc.nodeValue.replace("0x", "#"),'stroke-width':5,'stroke-linejoin':'round','stroke-linecap':'round','fill':'none','lineId':Number(parent.lcode.value),'class':'cluster ' + Number(parent.lcode.value)},'normal')
        },
        _drewStation:function(data){
            var self = this
            var _arry = data.lp.value.split(';')
            var _state = data.slb.value.split(';')
            _state = _state[0].split(',')
            for (let index = 0; index < _arry.length; index++) {
                var str = _arry[index].split(',')
                self._generate('rect',{'lineId':Number(data.lcode.nodeValue),'class':'cluster','fill':data.lc.nodeValue.replace("0x", "#"),'width':str[2],'height':str[3],'x':str[0],'y':str[1]},'lineName')
                if (Number(data.lcode.nodeValue) <= 57)
                    if(_state[index] != '大兴' && _state[index] != '八通')
                        state = "地铁" + _state[index] + "号线";
                    else{
                        state = "地铁" + _state[index] + "线";
                    }
                else {
                    if (_state[index] == "首都机场")
                        state = _state[index]+"线";
                    else if (_state[index] == "大兴机场")
                        state = _state[index]+"线";
                    else
                        state = "地铁"+_state[index]+"线";
                }
                self._generate('text',{'lineId':Number(data.lcode.nodeValue),'class':'cluster','fill':'#ccc','font-family':'微软雅黑','font-size':12,'text-anchor':'middle','x':Number(str[0]) + 35,'y':Number(str[1]) + 14,'sdata':state,'lb':data.lb.value,'lbx':data.lbx.value,'lby':data.lby.value,'type':'line'},'lineName',state)

            }
        },
        _drewStationPoint:function(parent,data){
            if(data.show){
                return
            }
            if(data.ex.value == 'true'){
                this._generate('image',{'id':data.acc.value,'href':turnHref,'width':8,'height':8,'x':data.dx ? Number(data.x.value) - 4 + Number(data.dx.value) : Number(data.x.value) - 4,'y':data.dy ? Number(data.y.value) - 4 + Number(data.dy.value) : Number(data.y.value) - 4,'sdata':data.lb.value,'type':'station','lineId':Number(parent.lcode.value),'class':'cluster ' + Number(parent.lcode.value),'sort':parent.sort.value},'stationPoint')
            }else{
                this._generate('circle',{'id':data.acc.value,'fill':'white','r':2,'stroke':'black','stroke-width':1,'cx':Number(data.x.value),'cy':Number(data.y.value),'sdata':data.lb.value,'type':'station','lineId':Number(parent.lcode.value),'class':'cluster ' + Number(parent.lcode.value),'sort':parent.sort.value},'stationPoint')
            }
        },
        _drewStationName:function(parent,data){
            if(data.show == undefined){
                this._generate('text',{'id':data.acc.value,'ex':String(data.ex.value),'se':data.se ? String(data.se.value) : '','font-family':'微软雅黑','x':Number(data.x.value) + Number(data.rx.value),'y':Number(data.y.value) + Number(data.ry.value) + 15,'fill':'#ccc','font-size':12,'lineId':Number(parent.lcode.value),'class':'cluster ' + Number(parent.lcode.value),'type':'station','stationName':data.lb.value},'stationName',data.lb.value)
            }
        },
        _drewFullLoad:function(parent,data,index,next){
            var self = this
            var double = 5
            var _x = Number(data[index].attributes.x.value)
            var _y = Number(data[index].attributes.y.value)
            var _uox = Number(data[index].attributes.uox.value)
            var _uoy = Number(data[index].attributes.uoy.value)
            var _dox = Number(data[index].attributes.dox.value)
            var _doy = Number(data[index].attributes.doy.value)
            var alr = false
            var dom = document.createElementNS('http://www.w3.org/2000/svg','g')
            dom.setAttribute('id',data[index].attributes.acc.value + 'full')
            dom.setAttribute('class','cluster ' + Number(parent.lcode.value))

            for (let index = 0; index < stationPath.length; index++) {
                if(stationPath[index].line == Number(parent.lcode.value)){
                    alr = true
                }
            }

            if(!alr){
                stationPath.push(
                    {
                        line:Number(parent.lcode.value),
                        station:[]
                    }
                )
            }

            document.getElementById('fullLoad').appendChild(dom);
            if(data[index].attributes.arc != undefined){
                var arr = data[index].attributes.arc.value.split(',')[0].split(':')
                var urc = data[index].attributes.uoarc.value.split(',')[0].split(':')
                var drc = data[index].attributes.doarc.value.split(',')[0].split(':')
                this._generate('path',{'sId':data[index].attributes.acc.value,'id':'up','d':'M' + (_x + double * _uox) + ' ' + (_y + double * _uoy) + ' Q' + (Number(arr[0]) + double * urc[0]) + ' ' + (Number(arr[1]) + double * urc[1]) + ' ' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.uox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.uoy.value)),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round','fill':'none',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')
                this._generate('path',{'sId':data[index].attributes.acc.value,'id':'down','d':'M' + (_x + double * _dox) + ' ' + (_y + double * _doy) + ' Q' + (Number(arr[0]) + double * drc[0]) + ' ' + (Number(arr[1]) + double * drc[1]) + ' ' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.dox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.doy.value)),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round','fill':'none',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')

                stationPath[stationPath.length - 1].station.push({
                    'sId':data[index].attributes.acc.value,
                    'id':'up',
                    'd':' M' + (_x + double * _uox) + ' ' + (_y + double * _uoy) + ' Q' + (Number(arr[0]) + double * urc[0]) + ' ' + (Number(arr[1]) + double * urc[1]) + ' ' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.uox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.uoy.value)),
                    'endX':Number(data[next].attributes.x.value),
                    'endY':Number(data[next].attributes.y.value)
                },{
                    'sId':data[index].attributes.acc.value,
                    'id':'down',
                    'd':' M' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.dox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.doy.value)) + ' Q' + (Number(arr[0]) + double * drc[0]) + ' ' + (Number(arr[1]) + double * drc[1]) + ' ' + (_x + double * _dox) + ' ' + (_y + double * _doy),
                    'endX':_x,
                    'endY':_y
                })

            }else{
                this._generate('line',{'sId':data[index].attributes.acc.value,'id':'up','x1':_x + double * _uox,'y1':_y + double * _uoy,'x2':Number(data[next].attributes.x.value) + double * Number(data[next].attributes.uox.value),'y2':Number(data[next].attributes.y.value) + double * Number(data[next].attributes.uoy.value),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')
                this._generate('line',{'sId':data[index].attributes.acc.value,'id':'down','x1':_x + double * _dox,'y1':_y + double * _doy,'x2':Number(data[next].attributes.x.value) + double * Number(data[next].attributes.dox.value),'y2':Number(data[next].attributes.y.value) + double * Number(data[next].attributes.doy.value),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')

                stationPath[stationPath.length - 1].station.push({
                    'sId':data[index].attributes.acc.value,
                    'id':'up',
                    'd':' M' + (_x + double * _uox) + ' ' + (_y + double * _uoy) + ' L' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.uox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.uoy.value)),
                    'endX':Number(data[next].attributes.x.value),
                    'endY':Number(data[next].attributes.y.value)
                },{
                    'sId':data[index].attributes.acc.value,
                    'id':'down',
                    'd':' M' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.dox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.doy.value)) + ' L' + (_x + double * _dox) + ' ' + (_y + double * _doy),
                    'endX':_x,
                    'endY':_y                    
                })

            }
            for (let i = index + 1; i < data.length; i++) {
                if(data[i].attributes.acc.value == ''){
                    var _x = Number(data[i].attributes.x.value)
                    var _y = Number(data[i].attributes.y.value)
                    var _uox = Number(data[i].attributes.uox.value)
                    var _uoy = Number(data[i].attributes.uoy.value)
                    var _dox = Number(data[i].attributes.dox.value)
                    var _doy = Number(data[i].attributes.doy.value)
                    if(data[i].attributes.arc != undefined){
                        var arr = data[i].attributes.arc.value.split(',')[0].split(':')
                        var urc = data[i].attributes.uoarc.value.split(',')[0].split(':')
                        var drc = data[i].attributes.doarc.value.split(',')[0].split(':')
                        self._generate('path',{'sId':data[index].attributes.acc.value,'id':'up','d':'M' + (_x + double * _uox) + ' ' + (_y + double * _uoy) + ' Q' + (Number(arr[0]) + double * urc[0]) + ' ' + (Number(arr[1]) + double * urc[1]) + ' ' + (Number(data[i + 1].attributes.x.value) + double * Number(data[i + 1].attributes.uox.value)) + ' ' + (Number(data[i + 1].attributes.y.value) + double * Number(data[i + 1].attributes.uoy.value)),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round','fill':'none',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')
                        self._generate('path',{'sId':data[index].attributes.acc.value,'id':'down','d':'M' + (_x + double * _dox) + ' ' + (_y + double * _doy) + ' Q' + (Number(arr[0]) + double * drc[0]) + ' ' + (Number(arr[1]) + double * drc[1]) + ' ' + (Number(data[i + 1].attributes.x.value) + double * Number(data[i + 1].attributes.dox.value)) + ' ' + (Number(data[i + 1].attributes.y.value) + double * Number(data[i + 1].attributes.doy.value)),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round','fill':'none',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')
                        
                        stationPath[stationPath.length - 1].station.push({
                            'sId':data[index].attributes.acc.value,
                            'id':'up',
                            'd':' M' + (_x + double * _uox) + ' ' + (_y + double * _uoy) + ' Q' + (Number(arr[0]) + double * urc[0]) + ' ' + (Number(arr[1]) + double * urc[1]) + ' ' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.uox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.uoy.value)),
                            'endX':Number(data[next].attributes.x.value),
                            'endY':Number(data[next].attributes.y.value)
                        },{
                            'sId':data[index].attributes.acc.value,
                            'id':'down',
                            'd':' M' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.dox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.doy.value)) + ' Q' + (Number(arr[0]) + double * drc[0]) + ' ' + (Number(arr[1]) + double * drc[1]) + ' ' + (_x + double * _dox) + ' ' + (_y + double * _doy),
                            'endX':_x,
                            'endY':_y
                        })

                    }else{
                        self._generate('line',{'sId':data[index].attributes.acc.value,'id':'up','x1':_x + double * _uox,'y1':_y + double * _uoy,'x2':Number(data[i + 1].attributes.x.value) + double * Number(data[i + 1].attributes.uox.value),'y2':Number(data[i + 1].attributes.y.value) + double * Number(data[i + 1].attributes.uoy.value),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')
                        self._generate('line',{'sId':data[index].attributes.acc.value,'id':'down','x1':_x + double * _dox,'y1':_y + double * _doy,'x2':Number(data[i + 1].attributes.x.value) + double * Number(data[i + 1].attributes.dox.value),'y2':Number(data[i + 1].attributes.y.value) + double * Number(data[i + 1].attributes.doy.value),'stroke':'#79be85','stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round',lineId:Number(parent.lcode.value),class:'cluster ' + Number(parent.lcode.value),'type':'fullload','fullload':''},data[index].attributes.acc.value + 'full')

                        stationPath[stationPath.length - 1].station.push({
                            'sId':data[index].attributes.acc.value,
                            'id':'up',
                            'd':' M' + (_x + double * _uox) + ' ' + (_y + double * _uoy) + ' L' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.uox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.uoy.value)),
                            'endX':Number(data[next].attributes.x.value),
                            'endY':Number(data[next].attributes.y.value)
                        },{
                            'sId':data[index].attributes.acc.value,
                            'id':'down',
                            'd':' M' + (Number(data[next].attributes.x.value) + double * Number(data[next].attributes.dox.value)) + ' ' + (Number(data[next].attributes.y.value) + double * Number(data[next].attributes.doy.value)) + ' L' + (_x + double * _dox) + ' ' + (_y + double * _doy),
                            'endX':_x,
                            'endY':_y                    
                        })

                    }
                }else{
                    break
                }
            }
        },
        _generate:function(element,obj,tag,inner){
            var self = this
            var xx = 0
            var dom = document.createElementNS('http://www.w3.org/2000/svg',element)
            for (var key in obj) {
                dom.setAttribute(key,obj[key])
            }
            if(inner)
                dom.innerHTML = inner

            dom.onmousedown = function(){
                xx = panZoom.getPan().x
            }
            dom.onmouseup = function(e){
                if(panZoom.getPan().x == xx){
                    obj.rx = e.clientX
                    obj.ry = e.clientY
                    obj = JSON.parse(JSON.stringify(obj))
                    switch (obj.type) {
                        case 'line':
                            self._events('lineName.touch',obj)
                        break;
                        case 'station':
                            self._events('station.touch',obj)
                        break;
                        case 'mask':
                            self._events('mask')
                        break;
                        case 'zk':
                            self._events('zk',obj)
                        break;
                        default:
                        break;
                    }
                }
            }
            document.getElementById(tag).appendChild(dom);
        },
        _events: function (event,info){
            var _w = document.getElementById('subwayMain').getBBox().width
            var _h = document.getElementById('subwayMain').getBBox().height
            var _info = {}
            if(info){
                if(info.id){
                    _info.id = info.id
                    _info.x = info.x ? info.x : info.cx
                    _info.y = info.y ? info.y : info.cy
                    _info.rx = info.rx
                    _info.ry = info.ry
                    _info.line = {
                        lineId:info.lineId
                    }
                }else{
                    _info.lineId = info.lineId
                }
                _info.sdata = info.sdata ? info.sdata : ''
            }
            switch (event) {
                case 'lineName.touch':
                    $('#background,#select').remove()
                    this._generate('g',{'id':'background'},'subwayMain')
                    this._generate('rect',{'id':'eventsBg','x':-30,'y':135,'width':_w,'height':_h,'fill':'#000','fill-opacity':0.8,'type':'mask'},'background')
                    this._generate('g',{'id':'select'},'subwayMain')
                    $('#subwayMain g').children().each(function(e,i){
                        if(i.attributes.lineId && i.attributes.lineId.value == info.lineId){
                            var _dom = i.cloneNode(true)
                            document.getElementById('select').appendChild(_dom);
                        }
                    })
                    this._getCenterLine(info)
                    _callback()
                break;
                case 'station.touch':
                    // $('#background,#select').remove()
                    // this._generate('g',{'id':'background'},'subwayMain')
                    // this._generate('rect',{'id':'eventsBg','x':-30,'y':135,'width':_w,'height':_h,'fill':'#fff','fill-opacity':0.8,'type':'mask'},'background')
                    // this._generate('g',{'id':'select'},'subwayMain')
                    // $('#subwayMain g').children().each(function(e,i){
                    //     if(i.attributes.id && i.attributes.id.value == info.id && i.nodeName != 'line' && i.nodeName != 'path'){
                    //         var _dom = i.cloneNode(true)
                    //         document.getElementById('select').appendChild(_dom);
                    //     }
                    // })
                    this.stationNameJump(info)
                    console.log(info);
                break;
                case 'zk':
                    this.zkJump(info)
                break;
                case 'mask':
                    $('#background,#select').remove()
                    _callback()
                break;
            }
            
            //do something
            function _callback(){
                for (let index = 0; index < func.length; index++) {
                    if(func[index].event == event){
                        func[index].callback(_info)
                    }
                }
            }
        },
        _resize:function(){
            var pan = panZoom.getPan();
            var zoom = panZoom.getZoom();
            console.log(pan);
            panZoom.zoom(1)
            panZoom.pan({x:($('.Line').width() - 1860) / 2,y:($('.wirenetwork').height() - 1500) / 2})
            // this._animatePan({sx: pan.x, sy: pan.y, tx: ($('.Line').width() - 1860) / 2, ty: ($('.wirenetwork').height() - 1500) / 2})
            
        },
        _getCenterLine:function(params){
            var self = this
            var allLine = $(this.__proto__.xml).find('l')
            var pan = panZoom.getPan();
            var zoom = panZoom.getZoom();
            for (let index = 0; index < allLine.length; index++) {
                if(params.lb == allLine[index].attributes.lb.value){
                    self._animatePan({sx: pan.x, sy: pan.y, tx: (-params.lbx*zoom)+window.innerWidth/2, ty: (-params.lby*zoom)+window.innerHeight/2})
                }
            }
        },
        _animatePan:function(amount){
            var animationTime = 300; // ms
            var animationStepTime = 15; // one frame per 30 ms
            var animationSteps = animationTime / animationStepTime;
            var animationStep = 0;
            var intervalID = null;
            var stepX = (amount.tx - amount.sx) / animationSteps;
            var stepY = (amount.ty - amount.sy) / animationSteps;

            intervalID = setInterval(function() {
                if (animationStep++ < animationSteps) {
                    panZoom.panBy({x: stepX, y: stepY});
                } else {
                    clearInterval(intervalID);
                }
            }, animationStepTime);
        },
        _getBetweenPath:function(from,to,direction,fId,tId,lineId){
            var path = ''
            var position = false

            // console.log(fId,tId);
            //2是1号线古城到四惠东方向，1是相反，上下行我说不好

            for (let index = 0; index < stationPath.length; index++) {
                if(stationPath[index].line == lineId){

                    for (let i = 0; i < stationPath[index].station.length; i++) {
                        if(direction == 1){
                            if(lineId == 7 || lineId == 5|| lineId == 1 || lineId == 6){
                                if(stationPath[index].station[i].sId == fId && stationPath[index].station[i].id == 'up'){
                                    path += stationPath[index].station[i].d
                                }
                            }else{
                                if(stationPath[index].station[i].sId == tId && stationPath[index].station[i].id == 'up'){
                                    path += stationPath[index].station[i].d
                                }
                            }
                            
                        }else{
                            if(lineId == 7 || lineId == 5|| lineId == 1 || lineId == 6){
                                if(stationPath[index].station[i].sId == fId && stationPath[index].station[i].id == 'down'){
                                    path += stationPath[index].station[i].d
                                }
                            }else{
                                if(stationPath[index].station[i].sId == tId && stationPath[index].station[i].id == 'down'){
                                    path += stationPath[index].station[i].d
                                }
                            }
                        }
                    }
                }
            }
            return path
            
        },
        addFlyLine:function(from,to,config){
            var self = this
            var fx = Number(from.x)
            var fy = Number(from.y)
            var _w = document.getElementById('subwayMain').getBBox().width
            var _h = document.getElementById('subwayMain').getBBox().height
            var _DOM = ''
            var fly = 'fly' + config
            var color = ['#028101','#009BC0']
            
            if($('#select').length == 0){
                this._generate('g',{'id':'background'},'subwayMain')
                this._generate('rect',{'id':'eventsBg','x':-30,'y':135,'width':_w,'height':_h,'fill':'#000','fill-opacity':0.8},'background')
                this._generate('g',{'id':'select'},'subwayMain')
            }

            // $('#background,#select').remove()

            $('#subwayMain #stationName').children().each(function(e,i){
                if(i.attributes.id && i.attributes.id.value == from.id && i.nodeName != 'line' && i.nodeName != 'path'){
                    var _dom = i.cloneNode(true)
                    document.getElementById('select').appendChild(_dom);
                }
                
                for (let index = 0; index < to.length; index++) {
                    if(i.attributes.id && i.attributes.id.value == to[index].id && i.nodeName != 'line' && i.nodeName != 'path' && i.localName == 'text'){
                        var _dom = i.cloneNode(true)
                            _dom.textContent = _dom.textContent + '(' + to[index].detail + ')'
                            _dom.attributes.fill.value = color[config]
                            // _dom.textContent.appendChild('<tspan x="10" y="45" style="fill:#000;">111</tspan>')
                        
                        console.log($('#select #' + _dom.attributes.id.value).length);
                        if($('#select #' + _dom.attributes.id.value).length){
                            _dom.attributes.y.value = parseInt(_dom.attributes.y.value) + 11
                        }
                        document.getElementById('select').appendChild(_dom);
                        continue;
                    }
                }
            })
            
            this._generate('g',{'id':fly},'subwayMain')
            for (let index = 0; index < 3; index++) {
                this._generate('circle',{'id':fly + 'to' + index,'cx':fx,'cy':fy,'stroke':color[config],'stroke-width':1,'fill-opacity':'0'},fly)
                if(index > 0){
                    this._generate('animate',{'attributeName':'r','begin':'ani1.begin + ' + index*0.5 + 's','from':4,'to':20,'dur':'3s','repeatCount':'indefinite'},fly + 'to' + index)
                    this._generate('animate',{'attributeName':'opacity','begin':'ani1.begin + ' + index*0.5 + 's','from':1,'to':0,'dur':'3s','repeatCount':'indefinite'},fly + 'to' + index)
                }else{
                    this._generate('animate',{'attributeName':'r','id':'ani1','begin':0,'from':4,'to':20,'dur':'3s','repeatCount':'indefinite'},fly + 'to' + index)
                    this._generate('animate',{'attributeName':'opacity','begin':0,'from':1,'to':0,'dur':'3s','repeatCount':'indefinite'},fly + 'to' + index)
                }
            }
            
            for (let index = 0; index < to.length; index++) {
                var tx = Number(to[index].x)
                var ty = Number(to[index].y)
                var id = to[index].name
                this._generate('g',{'id':id + fly},fly)
                this._generate('path',{'id':id + fly + 'parent','d':'M' + fx + ' ' + fy + ' Q' + ((fx - tx ) / 2 + tx) + ' ' + ty + ' ' + tx + ' ' + ty,'stroke':color[config],'stroke-width':2,'stroke-linejoin':'round','stroke-linecap':'round','fill':'none'},id + fly)
                this._generate('path',{'id':id + fly + 'path','d':'M0,0 L4,6 L0,12 L12,6 L0,0','fill':color[config],'transform':'translate(-6,-6)'},id + fly)
                if(config == 1){
                    this._generate('animateMotion',{'path':'M' + tx + ' ' + ty + ' Q' + ((fx - tx ) / 2 + tx) + ' ' + ty + ' ' + fx + ' ' + fy,'begin':index*0.5 + 's','dur':'5s','rotate':'auto','repeatCount':'indefinite'},id + fly + 'path')                   
                }else{
                    this._generate('animateMotion',{'path':'M' + fx + ' ' + fy + ' Q' + ((fx - tx ) / 2 + tx) + ' ' + ty + ' ' + tx + ' ' + ty,'begin':index*0.5 + 's','dur':'5s','rotate':'auto','repeatCount':'indefinite'},id + fly + 'path')                   
                }
                this._generate('circle',{'id':id + 'point','cx':tx,'cy':ty,'r':3,'stroke':color[config],'fill':'#fff','stroke-width':2,'fill-opacity':1},fly)
            }
            this._generate('circle',{'id':'to','cx':fx,'cy':fy,'r':5,'stroke':color[config],'fill':'#fff','stroke-width':4,'fill-opacity':1},fly)
        },
        stationName:function(type){
            //type:1 显示全部车站名称 2:不显示车站名称 3:只显示起止站和换乘站名称
            switch (type) {
                case 1:
                    $('#stationName').show()
                    $('#stationName').children().each(function(e,i){
                        i.style.display = 'block'
                    })
                break;
                    
                case 2:
                    $('#stationName').hide()
                break;

                case 3:
                    $('#stationName').show()
                    $('#stationName').children().each(function(e,i){
                        // console.log(i.attributes.ex.value);
                        if(i.attributes.ex.value != 'true'){
                            i.style.display = 'none'
                        }
                        if(i.attributes.se.value == 'true'){
                            i.style.display = 'block'
                        }
                    })
                break;
            }
        },
        lineName(data){
            data ? $('#lineName').show() : $('#lineName').hide()
        },
        codeStation(code){
            //站点名称对应StationList表
            var num = 0
            for (let index = 0; index < StationList.length; index++) {
                if(code == StationList[index].Code){
                    num++
                    return this.getPosition(StationList[index].name)
                }
            }
            if(num == 0){
                return false;
            }
        },
        openFullLoad(res){
            //打开满载率图层
            if(res){
                $('#normal').hide()
                $('#fullLoad,.wirenetwork .fullLoadBtn').show()
            }else{
                $('#normal').show()
                $('#fullLoad,.wirenetwork .fullLoadBtn').hide()
            }
        },
        showLess(){
            //减少图像辅助内容显示
            if($('.clusterTrue').length == 0){
                this.stationName(3)
                this.lineName(false)
            }
        },
        showLess2(){
            //减少图像辅助内容显示
            if($('.clusterTrue').length == 0){
                this.stationName(1)
                this.lineName(false)
            }
        },
        showNormal(){
            //图像辅助内容全部显示
            if($('.clusterTrue').length == 0){
                this.stationName(1)
                this.lineName(true)
            }

        },

        /* 新增临时demo开始 */
        stopNormail:function(from,state){
            //绘制站点客流信息
            console.log(from);
            var cname = ''
            var end = 10
            var fx = from.line.length > 1 ? from.x - 3 : from.x
            var fy = from.line.length > 1 ? from.y - 3 : from.y
            var num = Math.floor(Math.random()*1000);
            var color = ['#56fcf0','#facb10','#f56911','#f42419']
            for (let index = 0; index < from.line.length; index++) {
                cname += from.line[index].lineId + ' ';
            }
            this._generate('g',{'id':'fly' + from.id,'class':'cluster ' + cname},'Passengerflow')
            $('#fly' + from.id).empty()
            switch (state) {
                case 0:
                    end = 10
                    for (let index = 1; index <= 3; index++) {
                        this._generate('circle',{'id':'flyto' + from.id + index,'cx':fx,'cy':fy,'stroke':color[state],'stroke-width':3,'fill-opacity':'0',r:index * 4,opacity:1 - .4 * index},'fly' + from.id)
                    }
                break;
                case 1:
                    end = 20
                    for (let index = 1; index <= 3; index++) {
                        this._generate('circle',{'id':'flyto' + from.id + index,'cx':fx,'cy':fy,'stroke':color[state],'stroke-width':4,'fill-opacity':'0',r:index * 6,opacity:1 - .3 * index},'fly' + from.id)
                    }
                break;
                case 2:
                    end = 30
                    for (let index = 1; index <= 3; index++) {
                        this._generate('circle',{'id':'flyto' + from.id + index,'cx':fx,'cy':fy,'stroke':color[state],'stroke-width':4.5,'fill-opacity':'0',r:index * 8,opacity:1 - .26 * index},'fly' + from.id)
                    }
                break;
                case 3:
                    end = 35
                    for (let index = 0; index < 3; index++) {
                        this._generate('circle',{'id':'flyto' + from.id + index,'cx':fx,'cy':fy,'stroke':color[state],'stroke-width':4.5,'fill-opacity':'0'},'fly' + from.id)
                        if(index > 0){
                            this._generate('animate',{'attributeName':'r','begin':'ani1.begin + ' + index + 's','from':4,'to':end,'dur':'5s','repeatCount':'indefinite'},'flyto' + from.id + index)
                            this._generate('animate',{'attributeName':'opacity','begin':'ani1.begin + ' + index + 's','from':1,'to':0,'dur':'5s','repeatCount':'indefinite'},'flyto' + from.id + index)
                        }else{
                            this._generate('animate',{'attributeName':'r','id':'ani1','begin':0,'from':4,'to':end,'dur':'5s','repeatCount':'indefinite'},'flyto' + from.id + index)
                            this._generate('animate',{'attributeName':'opacity','begin':0,'from':1,'to':0,'dur':'5s','repeatCount':'indefinite'},'flyto' + from.id + index)
                        }
                    }
                break;
            }
            
            
        },
        drewAlarm:function(from,state){
            //绘制站点管控信息
            var cname = ''
            for (let index = 0; index < from.line.length; index++) {
                cname += from.line[index].lineId + ' ';
            }
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/' + state + '.png','width':30,'height':40,'x':from.line.length > 1 ? from.x - 18 : from.x - 15,'y':from.y - 50,'class':'cluster zk ' + cname},'Passengerflow')
        },
        drewStationAlarm:function(from,state){
            //绘制站点管控信息
            var cname = ''
            for (let index = 0; index < from.line.length; index++) {
                cname += from.line[index].lineId + ' ';
            }
            this._generate('image',{'href':'http://172.51.216.72:41004/subway/' + state + '.png','width':30,'height':40,'x':from.line.length > 1 ? from.x - 18 : from.x - 15,'y':from.y - 50,'class':'cluster zk szk ' + cname,type:'zk'},'Passengerflow')
        },
        drewHeatmap:function(position,value){
            //绘制热力图
            if(position.id == undefined) return false;
            let cname = ''
            const base = Number((value * 100).toFixed(2))

            for (let index = 0; index < position.line.length; index++) {
                cname += position.line[index].lineId + ' ';
            }

            this._generate('g',{id:position.id + 'Hot','class':'cluster ' + cname},'HeatMap')
            this._generate('defs',{id:position.id + 'defs'},position.id + 'Hot')
            this._generate('radialGradient',{id:position.id + 'grad1',cx:"50%",cy:"50%",r:base + "%",fx:"50%",fy:"50%"},position.id + 'defs')

            this._generate('stop',{offset:"0%",style:"stop-color:rgb(255 0 0);stop-opacity:1"},position.id + 'grad1')
            this._generate('stop',{offset:base + "%",style:"stop-color:rgb(255 254 0);stop-opacity:1"},position.id + 'grad1')
            this._generate('stop',{offset:((100 - base) / 2 + base) + "%",style:"stop-color:rgb(9 255 0);stop-opacity:1"},position.id + 'grad1')
            this._generate('stop',{offset:"100%",style:"stop-color:rgb(0 201 255);stop-opacity:0.8"},position.id + 'grad1')

            this._generate('filter',{id:position.id + "f1",x:"0",y:"0",filterUnits:'userSpaceOnUse'},position.id + 'defs')
            this._generate('feGaussianBlur',{in:"StrokePaint",stdDeviation:"5"},position.id + 'f1')
            this._generate('circle',{id:position.id + "circle",cx:position.x >= 80 ? position.x : 80,cy:position.y,r:value * 20,fill:"url(#" + position.id + "grad1)",filter:"url(#" + position.id + "f1)"},position.id + 'Hot')
            if(position.x <= 80){
                $('#' + position.id + "circle").css({
                    transform : 'translate(' + ( - (80 - position.x) ) + 'px' + ',0)'
                })
            }
        },
        drewRunning:function(from,to,trainId,Percent,arrive,direction,speed){
            if(Percent == 100 || from == undefined || to == undefined || from.id == undefined || to.id == undefined) return;           

            var cname = ''
            var fromtoArray = []
            var path = ''
            var first = true
            var fId = ''
            var tId = ''
            var fixGap = false
            var lineId = ''
            var per = Percent / 100

            // console.log(from,to,trainId,Percent,arrive);

            //获取线路id
            for (let index = 0; index < to.line.length; index++) {
                cname += to.line[index].lineId + ' ';
            }

            //获取起止站ID
            for (let index = 0; index < from.line.length; index++) {
                for (let indext = 0; indext < to.line.length; indext++) {
                    if(from.line[index].lineId == to.line[indext].lineId){
                        fId = from.line[index].id
                        tId = to.line[indext].id
                        lineId = from.line[index].lineId
                        if(from.line[index].lineId == 74 || from.line[index].lineId == 9){
                            fixGap = true
                        }
                    }
                }
            }

            if(lineId == '') {
                return false;
            }

            // console.log('Line ID: ' + lineId);
            // console.log(stationPath);
            // console.log('PATH: ' + this._getBetweenPath(from,to,direction,fId,tId,lineId));

            //判断此列车是否已经存在，存在即更新并重置，不存即在新增
            if($('#' + trainId + 'realtime').length > 0){
                var element = $('#' + trainId + 'Y').get(0)
                element.setAttributeNS(null,"dur",speed ? arrive / speed : arrive + "s");
                element.setAttributeNS(null,"keyPoints","0;" + per + ";1");
                element.setAttributeNS(null,"path",this._getBetweenPath(from,to,direction,fId,tId,lineId));
            }else{
                this._generate('image',{id:trainId + 'realtime','href':'http://172.51.216.72:41004/subway/type1.png','width':10,'height':10,'class':direction == 'down' ? 'cluster train fixgap ' + cname : 'cluster train ' + cname},'alarm')
                this._generate('animateMotion',{
                    id:trainId + 'Y',
                    dur:speed ? arrive / speed : arrive + "s",
                    // fill:"freeze", //结束后冻结车辆图标
                    keyPoints:"0;" + per + ";1",
                    keyTimes:"0;0.0001;1",
                    rotate:"auto",
                    calcMode:"linear",
                    begin:"indefinite",
                    restart:"always",
                    path:this._getBetweenPath(from,to,direction,fId,tId,lineId)}
                ,trainId + 'realtime') 
            }
            var element = $('#' + trainId + 'Y').get(0);
            element.addEventListener('endEvent', () => {
                // alert('something');
            })
            element.beginElement();
        },
        drewStop:function(station,trainId,lineid){
            if($('#' + trainId + 'stop').length == 0 && station && station.line){
                this._generate('image',{id:trainId + 'stop','href':'http://172.51.216.72:41004/subway/type2.png','width':10,'height':10,'x':station.line.length > 1 ? station.x - 3 : station.x,'y':station.line.length > 1 ? station.y - 3 : station.y,'class':'cluster train ' + lineid},'stop')
            }
        },
        clearStop:function(){
            $('#stop').html('')
        },
        pause:function(){
            var svg = document.getElementById("subway");
            svg.pauseAnimations();
        },
        unpause:function(){
            var svg = document.getElementById("subway");
            svg.unpauseAnimations();
        },
        stationNameJump(info){
            window.handleClickFun(info)
        },
        FullLoaddigo(info){
            window.FullLoadDigo(info)
        },
        zkJump(info){
            window.handleClickZKFun(info)
        },







        /* 新增临时demo结束 */
        clearFlyLine:function(){
            $('#background,#select,#fly0,#fly1').remove()
        },
        loadRateMultiply:function(from,to,num){
            if(from == undefined || to == undefined || from.line == undefined || to.line == undefined) return;  

            var self = this

            showMultiply()

            function getColor(num) {
                if(num >= 0 && num <= 25){
                    return '#79be85'
                }else if(num > 25 && num <= 50){
                    return '#f1d44b'
                }else if(num > 50 && num <= 75){
                    return '#de8c17'
                }else if(num > 75){
                    return '#d0000f'
                }

            }

            console.log(from,to,num);

            function showMultiply(){
                var id,next;
                for (let index = 0; index < from.line.length; index++) {
                    for (let i = 0; i < to.line.length; i++) {
                        if(from.line[index].lineId == to.line[i].lineId){
                            if(from.line[index].lineId == 98){
                                switch (from.line[index].id) {
                                    case 151020053:
                                        switch (to.line[i].id) {
                                            case 151020055://东直门至三元桥
                                                drewMultiply('#151020053full')
                                            break;
                                        }
                                    break;
                                    case 151020055:
                                        switch (to.line[i].id) {
                                            case 151020053://三元桥至东直门
                                                drewMultiply('#151020061full')
                                            break;
                                            case 151020057://三元桥至3号航站楼
                                                drewMultiply('#151020055full')
                                            break;
                                        }
                                    break;
                                    case 151020057:
                                        switch (to.line[i].id) {
                                            case 151020059://3号航站楼至2号航站楼
                                                drewMultiply('#151020057full')
                                            break;
                                        }
                                    break;
                                    case 151020059:
                                        switch (to.line[i].id) {
                                            case 151020055://2号航站楼至三元桥
                                                drewMultiply('#151020059full')
                                            break;
                                        }
                                    break;
                                }
                            }else{
                                if(from.line[index].id > to.line[i].id){
                                    next = true
                                    id = to.line[i].id
                                    if(from.line[index].id > to.line[i].id + 3){
                                        next = false
                                        id = from.line[index].id
                                    }
                                }else{
                                    next = false
                                    id = from.line[index].id
                                    if(from.line[index].id < to.line[i].id - 3){
                                        next = true
                                        id = to.line[i].id
                                    }
                                }
                                drewMultiply('',from.line[index].lineId)
                            }
                        }
                    }
                }
                function drewMultiply(tagId,lineid) {
                    if(tagId){
                        $(tagId).children().each(function(e,i){
                            i.attributes.stroke.value = getColor(num)
                            i.attributes.fullload.value = num
                            // pushArrow(i)
                            bind(i)
                        })
                    }else{
                        $('#subwayMain #fullLoad').children().each(function(e,i){
                            if(i.attributes.id && i.attributes.id.value == id + 'full'){
                                for (let index = 0; index < i.childNodes.length; index++) {
                                    if(i.childNodes[index].id == 'down' && next){
                                        i.childNodes[index].attributes.stroke.value = getColor(num)
                                        i.childNodes[index].attributes.fullload.value = num
                                        bind(i.childNodes[index])
                                        // pushArrow(i.childNodes[index],'down',lineid)
                                    }else if(i.childNodes[index].id == 'up' && !next){
                                        i.childNodes[index].attributes.stroke.value = getColor(num)
                                        i.childNodes[index].attributes.fullload.value = num
                                        bind(i.childNodes[index])
                                        // pushArrow(i.childNodes[index],'up',lineid)
                                    }
                                    
                                }
                            }
                        })
                    }

                    function bind(dom){
                        dom.onmouseover = function(){
                            self.FullLoaddigo(dom)
                        }
                    }

                    

                }
            }
            function pushArrow(params,direction,lineid) {
                console.log(params,direction,lineid);
                if(params.localName == 'line'){
                    var rx1 = Number(params.attributes.x1.value)
                    var rx2 = Number(params.attributes.x2.value)
                    var ry1 = Number(params.attributes.y1.value)
                    var ry2 = Number(params.attributes.y2.value)
                    var x = Math.abs((rx1 - rx2) / 2) + (rx1 >= rx2 ?  rx2 : rx1)
                    var y = Math.abs((ry1 - ry2) / 2) + (ry1 >= ry2 ?  ry2 : ry1)
                    var rotate,sc,aa;
                    
                    if((rx1 == rx2)){//竖线细分从上至下和从下至上
                        if((ry1 > ry2)){//从下向上竖线
                            rotate = 'down'
                        }else{//从上向下竖线
                            rotate = 'up'
                        }
                        x-=1.5
                        y-=4.5
                    }else if((ry1 == ry2)){//横线细分从左至右和从右至左
                        if((rx1 > rx2)){//从右向左横线
                            rotate = 'right'
                        }else{//从左向右横线
                            rotate = 'left'
                        }
                        x-=4.5
                        y-=1.5
                    }else{
                        sc = Math.sqrt(Math.abs(ry1 - ry2) * Math.abs(ry1 - ry2) + Math.abs(rx1 - rx2) * Math.abs(rx1 - rx2));
                        aa = Number(Math.asin(Math.abs(ry1 - ry2)/sc) * 180 / Math.PI);
                    }
                    console.log(rotate,direction,aa);
                    if(lineid == 10 || lineid == 2 || lineid == 13 || lineid == 15 || lineid == 74 || lineid == 91){
                        console.log(direction);
                        switch (rotate) {
                            case 'down':
                                if(direction == 'up'){
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(90,1.5 1.5)'},'arrow')
                                }else{
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(-90,4.5 4.5)'},'arrow')
                                }
                            break;
                            case 'up':
                                if(direction == 'up'){
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(-90,4.5 4.5)'},'arrow')
                                }else{
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(90,1.5 1.5)'},'arrow')
                                }
                            break;
                            case 'left':
                                if(direction == 'up'){
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(180,4.5 1.5)'},'arrow')
                                }else{
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ')'},'arrow')
                                }
                            break;
                            case 'right':
                                if(direction == 'up'){
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ')'},'arrow')
                                }else{
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(180,4.5 1.5)'},'arrow')
                                }
                            break;
                        }
                    }else{
                        if(direction == 'up'){
                            if(rotate == 'left' || rotate == 'right'){
                                self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(180,4.5 1.5)'},'arrow')
                            }else{
                                if(aa){
                                    if(rx1 > rx2){
                                        self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(' + (90 + aa) + ',2.3 -.1)'},'arrow')
                                    }else{
                                        self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(' + (180 + aa) + ',3 2.2)'},'arrow')
                                    }
                                }else{
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(270,4.5 4.5)'},'arrow')
                                }
                            }
                        }else{
                            if(rotate == 'left' || rotate == 'right'){
                                self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ')'},'arrow')
                            }else{
                                if(aa){
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(' + aa + ',4 -4)'},'arrow')
                                }else{
                                    self._generate('image',{'href':arrowHref,'width':9,'height':3,'way':direction,'transform':'translate(' + x + ',' + y + ') rotate(90,1.5 1.5)'},'arrow')
                                }
                            }
                        }
                    }                    
                }else{

                }
            }
        },
        resetMultiply:function(){
            $('#subwayMain #fullLoad').children().each(function(e,i){
                for (let index = 0; index < i.childNodes.length; index++) {
                    i.childNodes[index].attributes.stroke.value = '#79be85'
                }
            })
        },
        getPosition:function(id){
            var cb = {}
            var tmp = []
            var ax = parseFloat($('#subwayMain').css('transform').substring(7).split(',')[4])
            var ay = parseFloat($('#subwayMain').css('transform').substring(7).split(',')[5])
            $('#subwayMain #stationPoint').children().each(function(e,i){
                if(i.attributes.type && i.attributes.type.value == 'station'){
                    if(i.attributes.id && i.attributes.id.value === id){
                        tmp.push(i)
                    }else if(i.attributes.sdata && i.attributes.sdata.value === id){
                        tmp.push(i)
                    }
                }
            })
            setInfo(tmp)
            function setInfo(i){
                if(i.length <= 0) return false;
                cb = {
                    x:i[0].attributes.cx ? Number(i[0].attributes.cx.value) : Number(i[0].attributes.x.value),
                    y:i[0].attributes.cy ? Number(i[0].attributes.cy.value) : Number(i[0].attributes.y.value),
                    id:Number(i[0].attributes.id.value),
                    name:i[0].attributes.sdata.value,
                    line:[]
                }
                if(i[0].localName == 'image'){
                    cb.x = cb.x + 7
                    cb.y = cb.y + 7
                    cb.rx = cb.x + ax
                    cb.ry = cb.y + ay
                }
                for (let index = 0; index < tmp.length; index++) {
                    var x = {}
                    x.id = Number(tmp[index].attributes.id.value)
                    x.lineId = Number(tmp[index].attributes.lineId.value)
                    x.sort = tmp[index].attributes.sort.value
                    cb.line.push(x)
                }
            }
            return cb
        },
        on:function(event,callback){
            func.push({event,callback})
        },
        listener:function(event,callback){
            var self = this
            // if($('#subwayMain g').length > 0){
            if(document.getElementsByClassName('normal').length > 0){
                callback()
            }else{
                setTimeout(()=>{
                    self.listener(event,callback)
                })
            }
        },
        showLine:function(id) {
            var _w = document.getElementById('subwayMain').getBBox().width
            var _h = document.getElementById('subwayMain').getBBox().height
            $('#background,#select').remove()
            this._generate('g',{'id':'background'},'subwayMain')
            this._generate('rect',{'id':'eventsBg','x':-30,'y':135,'width':_w,'height':_h,'fill':'#000','fill-opacity':0.8,'type':'mask'},'background')
            this._generate('g',{'id':'select'},'subwayMain')
            $('#subwayMain g').children().each(function(e,i){
                if(i.attributes.lineId && i.attributes.lineId.value == id){
                    var _dom = i.cloneNode(true)
                    document.getElementById('select').appendChild(_dom);
                }
            })
        }
    }
    window.onresize = function(){
        // tct_subway.prototype._resize()
    }
    _global = (function(){ return this || (0, eval)('this'); }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = tct_subway;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return tct_subway;});
    } else {
        !('tct_subway' in _global) && (_global.tct_subway = tct_subway);
    }
}());