var filterBar;

$(document).ready(function()
{
    $('.filter').hide();
    $('.popup').hide();

    $(document).on('click', '#info', function()
    {
        $(this).remove();
    });
    $(document).on('click', '.RightElement', function()
    {
        var filterName = $(this).text();
        addFilter(filterName);
        filterContent();
    });
    $(document).on('click', '.removeJob', function()
    {
        $(this).parent().remove();
    });
    $(document).on('click', '.removeFilter', function()
    {
        $(this).parent().remove();
        filterContent();
    });
    $(document).on('click', 'b', function()
    {
        var jobTitle = $(this).closest('.joblisting').find('.jobname').text();
        var tags = $(this).closest('.joblisting').find('.tag').map(function()
        {
            return $(this).text();
        }).get();
      
        var jobType = $(this).closest('.joblisting').find('b').text();
        var jobLocation = $(this).closest('.joblisting').find('.LastRow').text().replace('1d ago . ', '');
        var skills = $(this).closest('.joblisting').find('.RightElement').map(function()
        {
            return $(this).text();
        }).get();
      
        displayJobInformation(jobTitle, tags, jobType, jobLocation, skills);
    });    
    $('.addJob').click(function()
    {
        $('.popup').show();
    });
    $('#addJob').click(function()
    {
        var jobTitle = $('#jobTitle').val();
        var tags = $('#tags').val().split(',');
        var jobType = $('#jobType').val();
        var jobLocation = $('#jobLocation').val();
    
        var newJobListing = `
          <div class="joblisting">
            <span>
              <img src="images/manage.svg" alt="manage">
            </span>
            <span>
              <div class="row">
                <label class="jobname">
                  ${jobTitle}
                </label>
                ${tags.map(tag => `<label class="tag">${tag}</label>`).join('')}
              </div>
              <div class="row">
                <b>${jobType}</b>
              </div>
              <div class="LastRow">
                1d ago . ${jobLocation}
              </div>
            </span>
            <span class="RightInfo">
              <p class="RightElement">
                Fullstack
              </p>
              <p class="RightElement">
                Midweight
              </p>
              <p class="RightElement">
                Python
              </p>
              <p class="RightElement">
                React
              </p>
            </span>
            <img class="removeJob" src="images/icon-remove.svg" alt="removeJob">
          </div>
        `;
    
        $('.popup').hide();
        $('.main').prepend(newJobListing);
      });
    
});

function displayJobInformation(jobTitle, tags, jobType, jobLocation, skills)
{
  var jobPopupContent = `
    <div class="popup" id = "info">
      <h2>${jobTitle}</h2>
      <p><strong>Tags:</strong> ${tags.join(', ')}</p>
      <p><strong>Job Type:</strong> ${jobType}</p>
      <p><strong>Job Location:</strong> ${jobLocation}</p>
      <p><strong>Skills:</strong> ${skills.join(', ')}</p>
    </div>
  `;

  $('body').append(jobPopupContent);
}


function addFilter(filterName)
{
    filterBar = $('.filter');

    var filterSpan = $('<span>').addClass('filterElement');
    var filterP = $('<p>').text(filterName);
    var filterImg = $('<img>').addClass('removeFilter');
    
    filterSpan.append(filterP);
    filterSpan.append(filterImg);

    // Append the filter to the filter bar
    filterBar.append(filterSpan);

    // Giving the cross image to all the remove <img> tags
    $('.removeFilter').attr('src', 'images/icon-remove.svg')
}

function filterContent()
{
    var selectedFilters = $('.filterElement').map(function()
    {
        return $(this).find('p').text();
    }).get();

    if (selectedFilters.length == 0)
    {
        $('.filter').hide();
        $('.joblisting').show();
        return;
    }
    else
    {
        $('.filter').show();
    }

    $('.joblisting').each(function()
    {
        var itemFilters = $(this).find('.RightElement').map(function()
        {
            return $(this).text();
        }).get();
      
        var hasMatchingFilter = itemFilters.some(filter => selectedFilters.includes(filter));
  
        if (hasMatchingFilter)
        {
            $(this).show();
        }
        else
        {
            $(this).hide();
        }
    });
}

function addJob()
{
    
}