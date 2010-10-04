module Admin::ApplicationHelper

  def flash_message
    if not flash[:notice].blank?
      content_tag :div, flash[:notice], :class => 'flash notice'
    elsif not flash[:error].blank?
      content_tag :div, flash[:notice], :class => 'flash error'
    end
  end

  def animate_ajax_accordion(instance, &action)
    instance_name = instance.class.name.underscore
    str =<<-END
      var $header = $('##{instance_name}_#{instance.id}')\;
      var $accordion = $header.closest('.ajax-accordion')\;
      $accordion.ajaxAccordion('activate', -1)\;
      var reopen_accordion = setInterval(function(){
        if($accordion.data('ajaxAccordion').running){
          return
        }else{
          #{action.call(instance_name)}
          clearInterval(reopen_accordion);
          $accordion.ajaxAccordion('activate', $('##{instance_name}_#{instance.id}').index())\;
        }
      },200);
    END
    str.html_safe
  end

  def update_ajax_accordion_item(instance, partial = 'item')
    animate_ajax_accordion instance do |instance_name|
      <<-END
        $header.find('.header-content').html($('#{render_js :partial => partial, :locals => { instance_name.to_sym => instance }}').children().first().html())\;
        $header.children().last().html('#{render_js(:partial => instance)}')\;
      END
    end
  end

  def update_ajax_accordion_content(instance, partial ='form')
    animate_ajax_accordion instance do |instance_name|
      "$header.children().last().html('#{render_js(:partial => partial, :locals => { instance_name.to_sym => instance })}')\;"
    end
  end


end
