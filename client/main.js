import Butter from 'buttercms';
import './main.html';

const butter = Butter('de55d3f93789d4c5c26fb07445b680e8bca843bd');

Router.route('/', function() {
  this.render("Home")
});

// Dynamic pages
Router.route('/:slug', function() {
  let slug = this.params.slug;
  let that = this;

  butter.content.retrieve(['pages[slug='+slug+']']).then(function(resp) {
    // Get first item in returned collection of pages
    let page = resp.data.data.pages[0];

    SEO.set({
      title: page.title,
      meta: {
        description: page.description
      }
    });

    that.render('Page', {data: {page: page}});
  });
});