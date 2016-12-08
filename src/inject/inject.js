function checkForEditBar() {
  var cS = document.querySelector('.clone_story'),
      templateBtn = document.createElement('button'),
      ed = document.querySelector('.edit .controls'),
      tasksHeader = document.querySelector('.edit .tasks_count h4');

  if (!ed) { return; }
  if ($(ed).find('.story_template').length) { return; }
  if ($('button.addDod', $(tasksHeader).parent()).length) { return; }

  // if ($('button.addDod', $(tasksHeader).parent()).length < 1) {
  //   tasksHeader.insertAdjacentHTML('afterEnd', '<button class="std addDod" title="Add Definition of Done tasks">Add DoD Tasks</button>');
  //   $('button.addDod', $(tasksHeader).parent())[0].addEventListener('click', generateTasks, true);
  // }

  ed.style.width = '332px';
  templateBtn.className = 'left_endcap hoverable story_template';
  templateBtn.title = 'Apply description template to this story';
  templateBtn.innerHTML = '<img src="//i.imgur.com/qvQ83UA.png">';
  cS.className = cS.className + ' capped';
  cS.insertAdjacentElement('beforebegin', templateBtn);

  templateBtn.querySelector('img').style.marginLeft = '-2px';
  templateBtn.querySelector('img').style.marginTop = '1px';
  templateBtn.addEventListener('click', generateStory, true);

}

function generateTasks(e) {

  var tasks = [
      'HTD confirmed locally',
      'Cross-browser testing passes',
      'Automated tests pass',
      'HTD confirmed on staging',
    ];

  for (task of tasks) {
    $('.edit .TaskEdit textarea').val(task);
    $('.edit .TaskEdit button.addTaskButton').trigger('click');
  }

}

function createFeatureTemplate() {
  var context    = '### Context\n---\n\n*Include background details for this story here*\n\n',
      htd        = '### How To Demo\n---\n\n1. *Start your demo here*\n\n',
      impDetails = '### Implementation Details\n---\n\n*Include technical details or considerations here*\n\n',
      uxDetails  = '### Design/UX Details\n---\n\n*Include design details or considerations here*\n\n';

  return context + htd + impDetails + uxDetails;
}

function createBugTemplate() {
  var context    = '### Context\n---\n\n*Include background details for this story here*\n\n',
      htr        = '### How To Replicate\n---\n\n1. *Start your replication process here*\n\n',
      outcomes   = '**Present outcome**\n\n**Expected outcome**\n\n',
      impDetails = '### Implementation Details\n---\n\n*Include technical details or considerations here*\n\n';

  return context + htr + outcomes + impDetails;
}

function createChoreTemplate() {
  var context    = '### Context\n---\n\n*Include background details for this story here*\n\n',
      questions    = '### Questions\n---\n\n*Add questions here*\n\n',
      impDetails = '### Implementation Details\n---\n\n*Include technical details or considerations here*\n\n';

  return context + questions + impDetails;
}

function createReleaseTemplate() {
  // Currently, we have no need for a description
  // tempalate on release stories
  return "";
}

function generateStory(e) {
  var nextSection = $('.story_template').parents('.model_details').eq(0).next().next(),
      textArea = nextSection.find('.editor.tracker_markup.description'),
      existingData = textArea.val(),
      ev = new jQuery.Event('keyup'), // jshint ignore:line
      markdown;

  ev.which = 13;
  ev.keyCode = 13;

  switch ($('input[name="story[story_type]"]').val()) {
    case 'feature':
      markdown = createFeatureTemplate();
      break;
    case 'bug':
      markdown = createBugTemplate();
      break;
    case 'chore':
      markdown = createChoreTemplate();
      break;
    case 'release':
      markdown = createReleaseTemplate();
      break;
    default:
      markdown = createFeatureTemplate();
  }

  origContent = '\n\n### Original Content\n---\n\n' + existingData,

  nextSection.find('.rendered_description').trigger('click');
  if (textArea.val()) {
    if (textArea.val() === markdown) {
      alert('The description for this story already matches the current template.');
    } else if (confirm('Existing description content will be placed at the bottom. Would you like to continue?')) {
      textArea.val(markdown + origContent);
    }
  } else {
    textArea.val(markdown);
  }

  nextSection.find('button[id^="story_description_done_"]').trigger('click');

  e.preventDefault();
}

chrome.extension.sendMessage({}, function() { // jshint ignore:line
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      $('body').on('DOMSubtreeModified', function() {
        checkForEditBar();
      });
    }
  }, 10);
});
