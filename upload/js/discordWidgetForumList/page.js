function escapeHTML(s) { //http://stackoverflow.com/questions/5251520
    return s.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

function discordWidgetForumList_init(_undefined){
	var widgetContainer = document.getElementById('discordWidgetForumList');
	var url = 'https://canary.discordapp.com/api/guilds/'+discordServerIdForWidget+'/widget.json';
	jQuery.get(url,{},function(data,textStatus,jqXHR){
		//console.log(data);
		var acc='';
		var hasLink = discordServerLinkForWidget!='';
		var defaultHeader = discordServerHeaderForWidget=='';
		// 1 Title
		// 1.1 Title as Discord's logo
		if(defaultHeader){
			if(hasLink){
				acc+='<a href="'+escape(discordServerLinkForWidget)+'">';
			}
			acc+='<div class="secondaryContent" style="background-color: #738bd7; padding: 15px; padding-top: 12.5px; padding-bottom: 12.5px; border-width: 0px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; background-image: none;">';
			acc+='<div style="background-image: url(\'js/discordWidgetForumList/discordLogo.svg\'); width: 77.5px; height: 21.25px; background-repeat: no-repeat;"></div>';
			acc+='</div>';
			if(hasLink){
				acc+='</a>';
			}
		}
		acc+='<div class="secondaryContent"'+(defaultHeader?' style="border-top-left-radius: 0px; border-top-right-radius: 0px; border-top-width: 0px;"':'')+'>';
		// 1.2 Title as defined text
		if(!defaultHeader){
			acc+='<h3>';
			if(hasLink){
				acc+='<a href="'+escape(discordServerLinkForWidget)+'">';
			}
			acc+=escapeHTML(discordServerHeaderForWidget);
			if(hasLink){
				acc+='</a>';
			}
			acc+='</h3>';
		}
		// 2 Content
		// 2.1 People online
		var statuses = {'online':0, 'idle':0, 'dnd':0};
		ppo='';
		ppo+='<style>';
		ppo+='.discordUserStatus {';
		ppo+=	'padding-left: 3px;';
		ppo+=	'padding-right: 3px;';
		ppo+=	'border-radius: 4px;';
		ppo+=	'';
		ppo+='}';
		ppo+='.discordStatusonline {';
		ppo+=	'background-color: #43b58133;';
		ppo+=	'';
		ppo+='}';
		ppo+='.discordStatusidle {';
		ppo+=	'background-color: #faa61a33;';
		ppo+=	'';
		ppo+='}';
		ppo+='.discordStatusdnd {';
		ppo+=	'background-color: #f0474733;';
		ppo+=	'';
		ppo+='}';
		ppo+='</style>';
		ppo+='<ol class="listInline" style="line-height: 1.75;">';
		data['members'].forEach(function(each,index,self){
			var status = each.status;
			var name = each.username;
			if(typeof(each.nick)!=="undefined"){
				name = each.nick;
			}
			ppo+='<li class="discordUserStatus discordStatus'+status+'" style="white-space: nowrap;">'
			ppo+=escapeHTML(name);
			ppo+='</li>'
			if(index != self.length-1){
				ppo+=', ';
			}
			if(typeof(statuses[status])!=="undefined"){
				statuses[status]++;
			}
		});
		ppo+='</ol>';
		// 2.2 Statistics
		acc+='<div class="pairsJustified footnote">';
		acc+='<dl><dt>Total:</dt><dd>'+data.members.length+'</dd></dl>';
		acc+='<dl><dt>Online:</dt><dd>'+statuses.online+'</dd></dl>';
		acc+='<dl><dt>Idle:</dt><dd>'+statuses.idle+'</dd></dl>';
		acc+='<dl><dt>Don\'t disturb:</dt><dd>'+statuses.dnd+'</dd></dl>';
		acc+='User list: <div style="font-size: 75%;">'+ppo+'</div>';
		acc+='</div>';
		widgetContainer.innerHTML=acc;
	},'json');
}

function discordWidgetForumList_preInit(jQuery,_undefined){
	var widgetContainer = document.getElementById('discordWidgetForumList');
	if (widgetContainer == null || typeof(discordServerIdForWidget)==="undefined" || typeof(discordServerLinkForWidget)==="undefined" || typeof(discordServerHeaderForWidget)==="undefined"){
		return setTimeout(function(){discordWidgetForumList_preInit(jQuery,_undefined);},100);
	}else{
		widgetContainer.style.display = null;
		return discordWidgetForumList_init();
	}
}

!function(jQuery,discordServerIdForWidget,_undefined){
	return discordWidgetForumList_preInit(jQuery,_undefined);
}(jQuery);
