const ScriptReviews = [
    {
      name: "Colchón Calm",
      sku: "tab-colchones",
      script: `
      new ReviewsWidget('#tab-colchones', {
      //Your REVIEWS.io account ID and widget type:
      store: 'calmessimple.com.ar',
      widget: 'polaris',
      //Content settings (store_review,product_review,questions). Choose what to display in this widget:
      options: {
          types: 'product_review',
          lang: 'es-AR',
          //Possible layout options: bordered, large and reverse.
          layout: 'large,',
          //How many reviews & questions to show per page?
          per_page: 20,
          //Product specific settings. Provide product SKU for which reviews should be displayed:
          product_review:{
              //Display product reviews - include multiple product SKUs seperated by Semi-Colons (Main Indentifer in your product catalog )
              sku: 'C80;C100;C140;C160;C180;C200;CP80;CP100;CP140;CP160;CP180;CP200;',
              hide_if_no_results: true,
          },
          //Questions settings:
          questions:{
              hide_if_no_results: true,
              enable_ask_question: true,
              show_dates: false,
              //Display group questions by providing a grouping variable, new questions will be assigned to this group.
              grouping:'C140'
          },
          //Header settings:
          header:{
              enable_summary: true, //Show overall rating & review count
              enable_ratings: true,
              enable_attributes: true,
              enable_image_gallery: false, //Show photo & video gallery
              enable_percent_recommended: false, //Show what percentage of reviewers recommend it
              enable_write_review: false, //Show "Write Review" button
              enable_ask_question: true, //Show "Ask Question" button
              enable_sub_header: true, //Show subheader
          },
          //Filtering settings:
          filtering:{
              enable: true, //Show filtering options
              enable_text_search: true, //Show search field
              enable_sorting: true, //Show sorting options (most recent, most popular)
              enable_overall_rating_filter: true, //Show overall rating breakdown filter
              enable_ratings_filters: true, //Show product attributes filter
              enable_attributes_filters: true, //Show author attributes filter
          },
          //Review settings:
          reviews:{
              min_rating: 4,
              enable_avatar: true, //Show author avatar
              enable_reviewer_name:  true, //Show author name
              enable_reviewer_address:  true, //Show author location
              reviewer_address_format: 'city', //Author location display format
              enable_verified_badge: true, //Show "Verified Customer" badge
              enable_reviewer_recommends: true, //Show "I recommend it" badge
              enable_attributes: true, //Show author attributes
              enable_product_name: true, //Show display product name
              enable_review_title: false, //Show review title
              enable_replies: undefined, //Show review replies
              enable_images: true, //Show display review photos
              enable_ratings: true, //Show product attributes (additional ratings)
              enable_share: true, //Show share buttons
              enable_helpful_vote: true, //Show "was this helpful?" section
              enable_helpful_display: true, //Show how many times times review upvoted
              enable_report: true, //Show report button
              enable_date: true, //Show when review was published
          },
      },
      //Translation settings
      translations: {
          'Verified Customer': 'Comprador Verificado'
      },
      //Style settings:
      styles: {
          //Base font size is a reference size for all text elements. When base value gets changed, all TextHeading and TexBody elements get proportionally adjusted.
          '--base-font-size': '16px',
          //Button styles (shared between buttons):
          //'--common-button-font-family': 'Girloy-Regular',
          '--common-button-font-size':'14px',
          '--common-button-font-weight':'400',
          '--common-button-letter-spacing':'0.3',
          '--common-button-text-transform':'uppercase',
          '--common-button-vertical-padding':'10px',
          '--common-button-horizontal-padding':'20px',
          '--common-button-border-width':'2px',
          '--common-button-border-radius':'5',
          //Primary button styles:
          '--primary-button-bg-color': '#F5A203',
          '--primary-button-border-color': '#FAFAFA',
          '--primary-button-text-color': '#FAFAFA',
          //Secondary button styles:
          '--secondary-button-bg-color': 'transparent',
          '--secondary-button-border-color': '#F5A203',
          '--secondary-button-text-color': '#FAFAFA',
          //Star styles:
          '--common-star-color': '#5700AA',
          '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
          '--medium-star-size': '30',
          '--small-star-size': '20',
          //Heading styles:
          '--heading-text-color': '#303030',
          '--heading-text-font-weight': '800',
          //'--heading-text-font-family': 'Girloy-Medium',
          '--heading-text-line-height': '1.5',
          '--heading-text-letter-spacing': '0.5px',
          '--heading-text-transform': 'uppercase',
          //Body text styles:
          '--body-text-color': '#303030',
          '--body-text-font-weight': '400',
          //'--body-text-font-family': 'Girloy-Regular',
          '--body-text-line-height': '1.4',
          '--body-text-letter-spacing': '0.3px',
          '--body-text-transform': 'none',
          //Input field styles:
          //'--inputfield-text-font-family': 'Girloy-Regular',
          '--input-text-font-size': '18',
          '--inputfield-text-font-weight': '400',
          '--inputfield-text-color': '#999999',
          '--inputfield-border-color': 'rgba(0,0,0,0.2)',
          '--inputfield-background-color': 'transparent',
          '--inputfield-border-width': '1px',
          '--inputfield-border-radius': '0px',
          '--common-border-color': 'rgba(0,0,0,0.15)',
          '--common-border-width': '1px',
          '--common-sidebar-width': '260px',
          //Slider indicator (for attributes) styles:
          '--slider-indicator-bg-color': '#F5A203',
          '--slider-indicator-button-color': '#5700AA',
          '--slider-indicator-width': '260px',
          //Badge styles:
          '--badge-icon-color': '#F5A203',
          '--badge-icon-font-size': 'inherit',
          '--badge-text-color': '#F5A203',
          '--badge-text-font-size': '10',
          '--badge-text-letter-spacing': '0.3',
          '--badge-text-transform': 'uppercase',
          //Author styles:
          '--author-font-size': '18',
          '--author-text-transform': 'capitalize',
          //Author avatar styles:
          '--avatar-thumbnail-size': '50px',
          '--avatar-thumbnail-border-radius': '100px',
          '--avatar-thumbnail-text-color': '#FAFAFA',
          '--avatar-thumbnail-bg-color': '#F5A203',
          //Product photo or review photo styles:
          '--photo-video-thumbnail-size': '80px',
          '--photo-video-thumbnail-border-radius': '0px',
          //Media (photo & video) slider styles:
          '--mediaslider-scroll-button-icon-color': '#303030',
          '--mediaslider-scroll-button-bg-color': '#F5A203',
          '--mediaslider-overlay-text-color': '#FAFAFA',
          '--mediaslider-overlay-bg-color': '#F5A20399)',
          '--mediaslider-item-size': '110px',
          //Pagination & tabs styles (normal):
          '--pagination-tab-text-color': '#303030',
          '--pagination-tab-text-transform': 'none',
          '--pagination-tab-text-letter-spacing': '0',
          '--pagination-tab-text-font-size': '16px',
          '--pagination-tab-text-font-weight': '600',
          //Pagination & tabs styles (active):
          '--pagination-tab-active-text-color': '#F5A203',
          '--pagination-tab-active-text-font-weight': '500',
          '--pagination-tab-active-border-color': '#F5A203',
          '--pagination-tab-border-width': '3px',
          
          /*Badge styles:*/
              '--badge-icon-color':'#F5A203',
              '--badge-icon-font-size':'20',
              '--badge-text-color':'#F5A203',
              '--badge-text-font-size':'10',
              '--badge-text-letter-spacing':'0.2',
              '--badge-text-transform':'uppercase',
              /*Author styles:*/
              '--author-font-size':'20',
              '--author-font-weight':'800',
              '--author-text-transform':'capitalize',
              /*Product photo or review photo styles:*/
              '--photo-video-thumbnail-size':'60',
              '--photo-video-thumbnail-border-radius':'10',
              /*Popup styles:*/
              '--popup-backdrop-color':'#3030307D',
              '--popup-color':'#FAFAFA',
              '--popup-star-color':'5700aa',
              '--popup-disabled-star-color':'inherit',
              '--popup-heading-text-color':'303030',
              '--popup-body-text-color':'303030',
              '--popup-badge-icon-color':'inherit',
              '--popup-badge-icon-font-size':'19px',
              '--popup-badge-text-color':'inherit',
              '--popup-badge-text-font-size':'14px',
              '--popup-border-width':'0px',
              '--popup-border-color':'rgba(0,0,0,0.1)',
              '--popup-border-radius':'25',
              '--popup-shadow-size':'10',
              '--popup-shadow-color':'#00000026',
              '--popup-icon-color':'#5700AA',
              /*Tooltip styles:*/
              '--tooltip-bg-color':'#0E1311',
              '--tooltip-text-color':'#FFFFFF'
      },
      });
      `,
    },
    {
      name: "Base Calm",
      sku: "tab-bases",
      script: `
      new ReviewsWidget('#tab-bases', {
          //Your REVIEWS.io account ID and widget type:
          store: 'calmessimple.com.ar',
          widget: 'polaris',
          //Content settings (store_review,product_review,questions). Choose what to display in this widget:
          options: {
              types: 'product_review',
              lang: 'es-AR',
              //Possible layout options: bordered, large and reverse.
              layout: 'large,',
              //How many reviews & questions to show per page?
              per_page: 20,
              //Product specific settings. Provide product SKU for which reviews should be displayed:
              product_review:{
                  //Display product reviews - include multiple product SKUs seperated by Semi-Colons (Main Indentifer in your product catalog )
                  sku: 'B80;B100;B140;B160;B180;B200',
                  hide_if_no_results: true,
              },
              //Questions settings:
              questions:{
                  hide_if_no_results: true,
                  enable_ask_question: true,
                  show_dates: false,
                  //Display group questions by providing a grouping variable, new questions will be assigned to this group.
                  grouping:'[Group questions by providing a grouping variable here or a specific product SKU]'
              },
              //Header settings:
              header:{
                  enable_summary: true, //Show overall rating & review count
                  enable_ratings: true,
                  enable_attributes: true,
                  enable_image_gallery: false, //Show photo & video gallery
                  enable_percent_recommended: false, //Show what percentage of reviewers recommend it
                  enable_write_review: false, //Show "Write Review" button
                  enable_ask_question: true, //Show "Ask Question" button
                  enable_sub_header: true, //Show subheader
              },
              //Filtering settings:
              filtering:{
                  enable: true, //Show filtering options
                  enable_text_search: true, //Show search field
                  enable_sorting: true, //Show sorting options (most recent, most popular)
                  enable_overall_rating_filter: true, //Show overall rating breakdown filter
                  enable_ratings_filters: true, //Show product attributes filter
                  enable_attributes_filters: true, //Show author attributes filter
              },
              //Review settings:
              reviews:{
                  min_rating: 4,
                  enable_avatar: true, //Show author avatar
                  enable_reviewer_name:  true, //Show author name
                  enable_reviewer_address:  true, //Show author location
                  reviewer_address_format: 'city', //Author location display format
                  enable_verified_badge: true, //Show "Verified Customer" badge
                  enable_reviewer_recommends: true, //Show "I recommend it" badge
                  enable_attributes: true, //Show author attributes
                  enable_product_name: true, //Show display product name
                  enable_review_title: false, //Show review title
                  enable_replies: undefined, //Show review replies
                  enable_images: true, //Show display review photos
                  enable_ratings: true, //Show product attributes (additional ratings)
                  enable_share: true, //Show share buttons
                  enable_helpful_vote: true, //Show "was this helpful?" section
                  enable_helpful_display: true, //Show how many times times review upvoted
                  enable_report: true, //Show report button
                  enable_date: true, //Show when review was published
              },
          },
          //Translation settings
          translations: {
              'Verified Customer': 'Comprador Verificado'
          },
          //Style settings:
          styles: {
              //Base font size is a reference size for all text elements. When base value gets changed, all TextHeading and TexBody elements get proportionally adjusted.
              '--base-font-size': '16px',
              //Button styles (shared between buttons):
              //'--common-button-font-family': 'Girloy-Regular',
              '--common-button-font-size':'14px',
              '--common-button-font-weight':'400',
              '--common-button-letter-spacing':'0.3',
              '--common-button-text-transform':'uppercase',
              '--common-button-vertical-padding':'10px',
              '--common-button-horizontal-padding':'20px',
              '--common-button-border-width':'2px',
              '--common-button-border-radius':'5',
              //Primary button styles:
              '--primary-button-bg-color': '#F5A203',
              '--primary-button-border-color': '#FAFAFA',
              '--primary-button-text-color': '#FAFAFA',
              //Secondary button styles:
              '--secondary-button-bg-color': 'transparent',
              '--secondary-button-border-color': '#F5A203',
              '--secondary-button-text-color': '#FAFAFA',
              //Star styles:
              '--common-star-color': '#5700AA',
              '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
              '--medium-star-size': '30',
              '--small-star-size': '20',
              //Heading styles:
              '--heading-text-color': '#303030',
              '--heading-text-font-weight': '800',
              //'--heading-text-font-family': 'Girloy-Medium',
              '--heading-text-line-height': '1.5',
              '--heading-text-letter-spacing': '0.5px',
              '--heading-text-transform': 'uppercase',
              //Body text styles:
              '--body-text-color': '#303030',
              '--body-text-font-weight': '400',
              //'--body-text-font-family': 'Girloy-Regular',
              '--body-text-line-height': '1.4',
              '--body-text-letter-spacing': '0.3px',
              '--body-text-transform': 'none',
              //Input field styles:
              //'--inputfield-text-font-family': 'Girloy-Regular',
              '--input-text-font-size': '18',
              '--inputfield-text-font-weight': '400',
              '--inputfield-text-color': '#999999',
              '--inputfield-border-color': 'rgba(0,0,0,0.2)',
              '--inputfield-background-color': 'transparent',
              '--inputfield-border-width': '1px',
              '--inputfield-border-radius': '0px',
              '--common-border-color': 'rgba(0,0,0,0.15)',
              '--common-border-width': '1px',
              '--common-sidebar-width': '260px',
              //Slider indicator (for attributes) styles:
              '--slider-indicator-bg-color': '#F5A203',
              '--slider-indicator-button-color': '#5700AA',
              '--slider-indicator-width': '260px',
              //Badge styles:
              '--badge-icon-color': '#F5A203',
              '--badge-icon-font-size': 'inherit',
              '--badge-text-color': '#F5A203',
              '--badge-text-font-size': '10',
              '--badge-text-letter-spacing': '0.3',
              '--badge-text-transform': 'uppercase',
              //Author styles:
              '--author-font-size': '18',
              '--author-text-transform': 'capitalize',
              //Author avatar styles:
              '--avatar-thumbnail-size': '50px',
              '--avatar-thumbnail-border-radius': '100px',
              '--avatar-thumbnail-text-color': '#FAFAFA',
              '--avatar-thumbnail-bg-color': '#F5A203',
              //Product photo or review photo styles:
              '--photo-video-thumbnail-size': '80px',
              '--photo-video-thumbnail-border-radius': '0px',
              //Media (photo & video) slider styles:
              '--mediaslider-scroll-button-icon-color': '#303030',
              '--mediaslider-scroll-button-bg-color': '#F5A203',
              '--mediaslider-overlay-text-color': '#FAFAFA',
              '--mediaslider-overlay-bg-color': '#F5A20399)',
              '--mediaslider-item-size': '110px',
              //Pagination & tabs styles (normal):
              '--pagination-tab-text-color': '#303030',
              '--pagination-tab-text-transform': 'none',
              '--pagination-tab-text-letter-spacing': '0',
              '--pagination-tab-text-font-size': '16px',
              '--pagination-tab-text-font-weight': '600',
              //Pagination & tabs styles (active):
              '--pagination-tab-active-text-color': '#F5A203',
              '--pagination-tab-active-text-font-weight': '500',
              '--pagination-tab-active-border-color': '#F5A203',
              '--pagination-tab-border-width': '3px',
              
              /*Badge styles:*/
                  '--badge-icon-color':'#F5A203',
                  '--badge-icon-font-size':'20',
                  '--badge-text-color':'#F5A203',
                  '--badge-text-font-size':'10',
                  '--badge-text-letter-spacing':'0.2',
                  '--badge-text-transform':'uppercase',
                  /*Author styles:*/
                  '--author-font-size':'20',
                  '--author-font-weight':'800',
                  '--author-text-transform':'capitalize',
                  /*Product photo or review photo styles:*/
                  '--photo-video-thumbnail-size':'60',
                  '--photo-video-thumbnail-border-radius':'10',
                  /*Popup styles:*/
                  '--popup-backdrop-color':'#3030307D',
                  '--popup-color':'#FAFAFA',
                  '--popup-star-color':'5700aa',
                  '--popup-disabled-star-color':'inherit',
                  '--popup-heading-text-color':'303030',
                  '--popup-body-text-color':'303030',
                  '--popup-badge-icon-color':'inherit',
                  '--popup-badge-icon-font-size':'19px',
                  '--popup-badge-text-color':'inherit',
                  '--popup-badge-text-font-size':'14px',
                  '--popup-border-width':'0px',
                  '--popup-border-color':'rgba(0,0,0,0.1)',
                  '--popup-border-radius':'25',
                  '--popup-shadow-size':'10',
                  '--popup-shadow-color':'#00000026',
                  '--popup-icon-color':'#5700AA',
                  /*Tooltip styles:*/
                  '--tooltip-bg-color':'#0E1311',
                  '--tooltip-text-color':'#FFFFFF'
          },
          });
      `,
    },
    {
      name: "Almohadas",
      sku: "tab-almohadas",
      script: ` new ReviewsWidget('#tab-almohadas', {
          //Your REVIEWS.io account ID and widget type:
                      store: 'calmessimple.com.ar',
                      widget: 'polaris',
          //Content settings (store_review,product_review,questions). Choose what to display in this widget:
                      options: {
                          types: 'product_review',
                          lang: 'es-AR',
                          //Possible layout options: bordered, large and reverse.
                          layout: 'large,',
                          //How many reviews & questions to show per page?
                          per_page: 20,
                          //Product specific settings. Provide product SKU for which reviews should be displayed:
                          product_review:{
                              //Display product reviews - include multiple product SKUs seperated by Semi-Colons (Main Indentifer in your product catalog )
                              sku: 'A1;AP1;AI70;AI85;ALMALMDOB065000;ALMALMDOB080000;ALMALMSIM065000;ALMALMSIM080000',
                              hide_if_no_results: true,
                          },
                          //Questions settings:
                          questions:{
                              hide_if_no_results: true,
                              enable_ask_question: true,
                              show_dates: false,
                              //Display group questions by providing a grouping variable, new questions will be assigned to this group.
                              grouping:'[Group questions by providing a grouping variable here or a specific product SKU]'
                          },
                          //Header settings:
                          header:{
                              enable_summary: true, //Show overall rating & review count
                              enable_ratings: true,
                              enable_attributes: true,
                              enable_image_gallery: false, //Show photo & video gallery
                              enable_percent_recommended: false, //Show what percentage of reviewers recommend it
                              enable_write_review: false, //Show "Write Review" button
                              enable_ask_question: true, //Show "Ask Question" button
                              enable_sub_header: true, //Show subheader
                          },
                          //Filtering settings:
                          filtering:{
                              enable: true, //Show filtering options
                              enable_text_search: true, //Show search field
                              enable_sorting: true, //Show sorting options (most recent, most popular)
                              enable_product_filter: true, //Show product options filter
                              enable_overall_rating_filter: true, //Show overall rating breakdown filter
                              enable_ratings_filters: true, //Show product attributes filter
                              enable_attributes_filters: true, //Show author attributes filter
                          },
                          //Review settings:
                          reviews:{
                              min_rating: 4,
                              enable_avatar: true, //Show author avatar
                              enable_reviewer_name:  true, //Show author name
                              enable_reviewer_address:  true, //Show author location
                              reviewer_address_format: 'city', //Author location display format
                              enable_verified_badge: true, //Show "Verified Customer" badge
                              enable_reviewer_recommends: true, //Show "I recommend it" badge
                              enable_attributes: true, //Show author attributes
                              enable_product_name: true, //Show display product name
                              enable_review_title: false, //Show review title
                              enable_replies: undefined, //Show review replies
                              enable_images: true, //Show display review photos
                              enable_ratings: true, //Show product attributes (additional ratings)
                              enable_share: true, //Show share buttons
                              enable_helpful_vote: true, //Show "was this helpful?" section
                              enable_helpful_display: true, //Show how many times times review upvoted
                              enable_report: true, //Show report button
                              enable_date: true, //Show when review was published
                          },
                      },
          //Translation settings
                      translations: {
                          'Verified Customer': 'Comprador Verificado'
                      },
          //Style settings:
                      styles: {
                          //Base font size is a reference size for all text elements. When base value gets changed, all TextHeading and TexBody elements get proportionally adjusted.
                          '--base-font-size': '16px',
                          //Button styles (shared between buttons):
                          //'--common-button-font-family': 'Girloy-Regular',
                          '--common-button-font-size':'14px',
                          '--common-button-font-weight':'400',
                          '--common-button-letter-spacing':'0.3',
                          '--common-button-text-transform':'uppercase',
                          '--common-button-vertical-padding':'10px',
                          '--common-button-horizontal-padding':'20px',
                          '--common-button-border-width':'2px',
                          '--common-button-border-radius':'5',
                          //Primary button styles:
                          '--primary-button-bg-color': '#F5A203',
                          '--primary-button-border-color': '#FAFAFA',
                          '--primary-button-text-color': '#FAFAFA',
                          //Secondary button styles:
                          '--secondary-button-bg-color': 'transparent',
                          '--secondary-button-border-color': '#F5A203',
                          '--secondary-button-text-color': '#FAFAFA',
                          //Star styles:
                          '--common-star-color': '#5700AA',
                          '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
                          '--medium-star-size': '30',
                          '--small-star-size': '20',
                          //Heading styles:
                          '--heading-text-color': '#303030',
                          '--heading-text-font-weight': '800',
                          //'--heading-text-font-family': 'Girloy-Medium',
                          '--heading-text-line-height': '1.5',
                          '--heading-text-letter-spacing': '0.5px',
                          '--heading-text-transform': 'uppercase',
                          //Body text styles:
                          '--body-text-color': '#303030',
                          '--body-text-font-weight': '400',
                          //'--body-text-font-family': 'Girloy-Regular',
                          '--body-text-line-height': '1.4',
                          '--body-text-letter-spacing': '0.3px',
                          '--body-text-transform': 'none',
                          //Input field styles:
                          //'--inputfield-text-font-family': 'Girloy-Regular',
                          '--input-text-font-size': '18',
                          '--inputfield-text-font-weight': '400',
                          '--inputfield-text-color': '#999999',
                          '--inputfield-border-color': 'rgba(0,0,0,0.2)',
                          '--inputfield-background-color': 'transparent',
                          '--inputfield-border-width': '1px',
                          '--inputfield-border-radius': '0px',
                          '--common-border-color': 'rgba(0,0,0,0.15)',
                          '--common-border-width': '1px',
                          '--common-sidebar-width': '260px',
                          //Slider indicator (for attributes) styles:
                          '--slider-indicator-bg-color': '#F5A203',
                          '--slider-indicator-button-color': '#5700AA',
                          '--slider-indicator-width': '260px',
                          //Badge styles:
                          '--badge-icon-color': '#F5A203',
                          '--badge-icon-font-size': 'inherit',
                          '--badge-text-color': '#F5A203',
                          '--badge-text-font-size': '10',
                          '--badge-text-letter-spacing': '0.3',
                          '--badge-text-transform': 'uppercase',
                          //Author styles:
                          '--author-font-size': '18',
                          '--author-text-transform': 'capitalize',
                          //Author avatar styles:
                          '--avatar-thumbnail-size': '50px',
                          '--avatar-thumbnail-border-radius': '100px',
                          '--avatar-thumbnail-text-color': '#FAFAFA',
                          '--avatar-thumbnail-bg-color': '#F5A203',
                          //Product photo or review photo styles:
                          '--photo-video-thumbnail-size': '80px',
                          '--photo-video-thumbnail-border-radius': '0px',
                          //Media (photo & video) slider styles:
                          '--mediaslider-scroll-button-icon-color': '#303030',
                          '--mediaslider-scroll-button-bg-color': '#F5A203',
                          '--mediaslider-overlay-text-color': '#FAFAFA',
                          '--mediaslider-overlay-bg-color': '#F5A20399)',
                          '--mediaslider-item-size': '110px',
                          //Pagination & tabs styles (normal):
                          '--pagination-tab-text-color': '#303030',
                          '--pagination-tab-text-transform': 'none',
                          '--pagination-tab-text-letter-spacing': '0',
                          '--pagination-tab-text-font-size': '16px',
                          '--pagination-tab-text-font-weight': '600',
                          //Pagination & tabs styles (active):
                          '--pagination-tab-active-text-color': '#F5A203',
                          '--pagination-tab-active-text-font-weight': '500',
                          '--pagination-tab-active-border-color': '#F5A203',
                          '--pagination-tab-border-width': '3px',
          
                          /*Badge styles:*/
                          '--badge-icon-color':'#F5A203',
                          '--badge-icon-font-size':'20',
                          '--badge-text-color':'#F5A203',
                          '--badge-text-font-size':'10',
                          '--badge-text-letter-spacing':'0.2',
                          '--badge-text-transform':'uppercase',
                          /*Author styles:*/
                          '--author-font-size':'20',
                          '--author-font-weight':'800',
                          '--author-text-transform':'capitalize',
                          /*Product photo or review photo styles:*/
                          '--photo-video-thumbnail-size':'60',
                          '--photo-video-thumbnail-border-radius':'10',
                          /*Popup styles:*/
                          '--popup-backdrop-color':'#3030307D',
                          '--popup-color':'#FAFAFA',
                          '--popup-star-color':'5700aa',
                          '--popup-disabled-star-color':'inherit',
                          '--popup-heading-text-color':'303030',
                          '--popup-body-text-color':'303030',
                          '--popup-badge-icon-color':'inherit',
                          '--popup-badge-icon-font-size':'19px',
                          '--popup-badge-text-color':'inherit',
                          '--popup-badge-text-font-size':'14px',
                          '--popup-border-width':'0px',
                          '--popup-border-color':'rgba(0,0,0,0.1)',
                          '--popup-border-radius':'25',
                          '--popup-shadow-size':'10',
                          '--popup-shadow-color':'#00000026',
                          '--popup-icon-color':'#5700AA',
                          /*Tooltip styles:*/
                          '--tooltip-bg-color':'#0E1311',
                          '--tooltip-text-color':'#FFFFFF'
                      },
                  });
                  `,
    },
    {
      name: "Ropa de Cama",
      sku: "tab-ropaDeCama",
      script: `
      new ReviewsWidget('#tab-ropaDeCama', {
  //Your REVIEWS.io account ID and widget type:
          store: 'calmessimple.com.ar',
          widget: 'polaris',
  //Content settings (store_review,product_review,questions). Choose what to display in this widget:
          options: {
              types: 'product_review',
              lang: 'es-AR',
              //Possible layout options: bordered, large and reverse.
              layout: 'large,',
              //How many reviews & questions to show per page?
              per_page: 20,
              //Product specific settings. Provide product SKU for which reviews should be displayed:
              product_review:{
                  //Display product reviews - include multiple product SKUs seperated by Semi-Colons (Main Indentifer in your product catalog )
                  sku:"BLASABMIC100002;BLASABMIC160002;BLASABMIC200002;BLASABALG100002;BLASABALG140002;BLASABALG180002;BLASABALG200002;BLACUBTUS100000;BLACUBTUS140000;BLACUBTUS180000;BLACUBTUS200000;BLACUBTUS100001;BLACUBTUS140001;BLACUBTUS180001;BLACUBTUS200001;BLACUBTUS100002;BLACUBTUS140002;BLACUBTUS180002;BLACUBTUS200002;BLACUBTUS100003;BLACUBTUS140003;BLACUBTUS180003;BLACUBTUS200003;BLACUBEDR100000;BLACUBEDR140000;BLACUBEDR180000;BLACUBEDR200000;",
                  hide_if_no_results: true,
              },
              //Questions settings:
              questions:{
                  hide_if_no_results: true,
                  enable_ask_question: true,
                  show_dates: false,
                  //Display group questions by providing a grouping variable, new questions will be assigned to this group.
                  grouping:'[Group questions by providing a grouping variable here or a specific product SKU]'
              },
              //Header settings:
              header:{
                  enable_summary: true, //Show overall rating & review count
                  enable_ratings: true,
                  enable_attributes: true,
                  enable_image_gallery: false, //Show photo & video gallery
                  enable_percent_recommended: false, //Show what percentage of reviewers recommend it
                  enable_write_review: false, //Show "Write Review" button
                  enable_ask_question: true, //Show "Ask Question" button
                  enable_sub_header: true, //Show subheader
              },
              //Filtering settings:
              filtering:{
                  enable: true, //Show filtering options
                  enable_text_search: true, //Show search field
                  enable_sorting: true, //Show sorting options (most recent, most popular)
                  enable_product_filter: true, //Show product options filter
                  enable_overall_rating_filter: true, //Show overall rating breakdown filter
                  enable_ratings_filters: true, //Show product attributes filter
                  enable_attributes_filters: true, //Show author attributes filter
              },
              //Review settings:
              reviews:{
                  min_rating: 4,
                  enable_avatar: true, //Show author avatar
                  enable_reviewer_name:  true, //Show author name
                  enable_reviewer_address:  true, //Show author location
                  reviewer_address_format: 'city', //Author location display format
                  enable_verified_badge: true, //Show "Verified Customer" badge
                  enable_reviewer_recommends: true, //Show "I recommend it" badge
                  enable_attributes: true, //Show author attributes
                  enable_product_name: true, //Show display product name
                  enable_review_title: false, //Show review title
                  enable_replies: undefined, //Show review replies
                  enable_images: true, //Show display review photos
                  enable_ratings: true, //Show product attributes (additional ratings)
                  enable_share: true, //Show share buttons
                  enable_helpful_vote: true, //Show "was this helpful?" section
                  enable_helpful_display: true, //Show how many times times review upvoted
                  enable_report: true, //Show report button
                  enable_date: true, //Show when review was published
              },
          },
  //Translation settings
          translations: {
              'Verified Customer': 'Comprador Verificado'
          },
  //Style settings:
          styles: {
              //Base font size is a reference size for all text elements. When base value gets changed, all TextHeading and TexBody elements get proportionally adjusted.
              '--base-font-size': '16px',
              //Button styles (shared between buttons):
              //'--common-button-font-family': 'Girloy-Regular',
              '--common-button-font-size':'14px',
              '--common-button-font-weight':'400',
              '--common-button-letter-spacing':'0.3',
              '--common-button-text-transform':'uppercase',
              '--common-button-vertical-padding':'10px',
              '--common-button-horizontal-padding':'20px',
              '--common-button-border-width':'2px',
              '--common-button-border-radius':'5',
              //Primary button styles:
              '--primary-button-bg-color': '#F5A203',
              '--primary-button-border-color': '#FAFAFA',
              '--primary-button-text-color': '#FAFAFA',
              //Secondary button styles:
              '--secondary-button-bg-color': 'transparent',
              '--secondary-button-border-color': '#F5A203',
              '--secondary-button-text-color': '#FAFAFA',
              //Star styles:
              '--common-star-color': '#5700AA',
              '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
              '--medium-star-size': '30',
              '--small-star-size': '20',
              //Heading styles:
              '--heading-text-color': '#303030',
              '--heading-text-font-weight': '800',
              //'--heading-text-font-family': 'Girloy-Medium',
              '--heading-text-line-height': '1.5',
              '--heading-text-letter-spacing': '0.5px',
              '--heading-text-transform': 'uppercase',
              //Body text styles:
              '--body-text-color': '#303030',
              '--body-text-font-weight': '400',
              //'--body-text-font-family': 'Girloy-Regular',
              '--body-text-line-height': '1.4',
              '--body-text-letter-spacing': '0.3px',
              '--body-text-transform': 'none',
              //Input field styles:
              //'--inputfield-text-font-family': 'Girloy-Regular',
              '--input-text-font-size': '18',
              '--inputfield-text-font-weight': '400',
              '--inputfield-text-color': '#999999',
              '--inputfield-border-color': 'rgba(0,0,0,0.2)',
              '--inputfield-background-color': 'transparent',
              '--inputfield-border-width': '1px',
              '--inputfield-border-radius': '0px',
              '--common-border-color': 'rgba(0,0,0,0.15)',
              '--common-border-width': '1px',
              '--common-sidebar-width': '260px',
              //Slider indicator (for attributes) styles:
              '--slider-indicator-bg-color': '#F5A203',
              '--slider-indicator-button-color': '#5700AA',
              '--slider-indicator-width': '260px',
              //Badge styles:
              '--badge-icon-color': '#F5A203',
              '--badge-icon-font-size': 'inherit',
              '--badge-text-color': '#F5A203',
              '--badge-text-font-size': '10',
              '--badge-text-letter-spacing': '0.3',
              '--badge-text-transform': 'uppercase',
              //Author styles:
              '--author-font-size': '18',
              '--author-text-transform': 'capitalize',
              //Author avatar styles:
              '--avatar-thumbnail-size': '50px',
              '--avatar-thumbnail-border-radius': '100px',
              '--avatar-thumbnail-text-color': '#FAFAFA',
              '--avatar-thumbnail-bg-color': '#F5A203',
              //Product photo or review photo styles:
              '--photo-video-thumbnail-size': '80px',
              '--photo-video-thumbnail-border-radius': '0px',
              //Media (photo & video) slider styles:
              '--mediaslider-scroll-button-icon-color': '#303030',
              '--mediaslider-scroll-button-bg-color': '#F5A203',
              '--mediaslider-overlay-text-color': '#FAFAFA',
              '--mediaslider-overlay-bg-color': '#F5A20399)',
              '--mediaslider-item-size': '110px',
              //Pagination & tabs styles (normal):
              '--pagination-tab-text-color': '#303030',
              '--pagination-tab-text-transform': 'none',
              '--pagination-tab-text-letter-spacing': '0',
              '--pagination-tab-text-font-size': '16px',
              '--pagination-tab-text-font-weight': '600',
              //Pagination & tabs styles (active):
              '--pagination-tab-active-text-color': '#F5A203',
              '--pagination-tab-active-text-font-weight': '500',
              '--pagination-tab-active-border-color': '#F5A203',
              '--pagination-tab-border-width': '3px',
  
              /*Badge styles:*/
              '--badge-icon-color':'#F5A203',
              '--badge-icon-font-size':'20',
              '--badge-text-color':'#F5A203',
              '--badge-text-font-size':'10',
              '--badge-text-letter-spacing':'0.2',
              '--badge-text-transform':'uppercase',
              /*Author styles:*/
              '--author-font-size':'20',
              '--author-font-weight':'800',
              '--author-text-transform':'capitalize',
              /*Product photo or review photo styles:*/
              '--photo-video-thumbnail-size':'60',
              '--photo-video-thumbnail-border-radius':'10',
              /*Popup styles:*/
              '--popup-backdrop-color':'#3030307D',
              '--popup-color':'#FAFAFA',
              '--popup-star-color':'5700aa',
              '--popup-disabled-star-color':'inherit',
              '--popup-heading-text-color':'303030',
              '--popup-body-text-color':'303030',
              '--popup-badge-icon-color':'inherit',
              '--popup-badge-icon-font-size':'19px',
              '--popup-badge-text-color':'inherit',
              '--popup-badge-text-font-size':'14px',
              '--popup-border-width':'0px',
              '--popup-border-color':'rgba(0,0,0,0.1)',
              '--popup-border-radius':'25',
              '--popup-shadow-size':'10',
              '--popup-shadow-color':'#00000026',
              '--popup-icon-color':'#5700AA',
              /*Tooltip styles:*/
              '--tooltip-bg-color':'#0E1311',
              '--tooltip-text-color':'#FFFFFF'
          },
      });
  `,
    },
    {
      name: "Accesorios",
      sku: "tab-accesorios",
      script: `
  new ReviewsWidget('#tab-accesorios', {
  //Your REVIEWS.io account ID and widget type:
      store: 'calmessimple.com.ar',
      widget: 'polaris',
  //Content settings (store_review,product_review,questions). Choose what to display in this widget:
      options: {
          types: 'product_review',
          lang: 'es-AR',
          //Possible layout options: bordered, large and reverse.
          layout: 'large,',
          //How many reviews & questions to show per page?
          per_page: 20,
          //Product specific settings. Provide product SKU for which reviews should be displayed:
          product_review:{
              //Display product reviews - include multiple product SKUs seperated by Semi-Colons (Main Indentifer in your product catalog )
              sku: 'MASCOLPER060000;MASCOLPER085000;MASCOLPER110000;BEBCOLORI100000;BEBCOLORI140000;BLAACCPRO080000;BLAACCPRO100000;BLAACCPRO140000;BLAACCPRO160000;BLAACCPRO180000;BLAACCPRO200000',
              hide_if_no_results: true,
          },
          //Questions settings:
          questions:{
              hide_if_no_results: true,
              enable_ask_question: true,
              show_dates: false,
              //Display group questions by providing a grouping variable, new questions will be assigned to this group.
              grouping:'[Group questions by providing a grouping variable here or a specific product SKU]'
          },
          //Header settings:
          header:{
              enable_summary: true, //Show overall rating & review count
              enable_ratings: true,
              enable_attributes: true,
              enable_image_gallery: false, //Show photo & video gallery
              enable_percent_recommended: false, //Show what percentage of reviewers recommend it
              enable_write_review: false, //Show "Write Review" button
              enable_ask_question: true, //Show "Ask Question" button
              enable_sub_header: true, //Show subheader
          },
          //Filtering settings:
          filtering:{
              enable: true, //Show filtering options
              enable_text_search: true, //Show search field
              enable_sorting: true, //Show sorting options (most recent, most popular)
              enable_product_filter: true, //Show product options filter
              enable_overall_rating_filter: true, //Show overall rating breakdown filter
              enable_ratings_filters: true, //Show product attributes filter
              enable_attributes_filters: true, //Show author attributes filter
          },
          //Review settings:
          reviews:{
              min_rating: 4,
              enable_avatar: true, //Show author avatar
              enable_reviewer_name:  true, //Show author name
              enable_reviewer_address:  true, //Show author location
              reviewer_address_format: 'city', //Author location display format
              enable_verified_badge: true, //Show "Verified Customer" badge
              enable_reviewer_recommends: true, //Show "I recommend it" badge
              enable_attributes: true, //Show author attributes
              enable_product_name: true, //Show display product name
              enable_review_title: false, //Show review title
              enable_replies: undefined, //Show review replies
              enable_images: true, //Show display review photos
              enable_ratings: true, //Show product attributes (additional ratings)
              enable_share: true, //Show share buttons
              enable_helpful_vote: true, //Show "was this helpful?" section
              enable_helpful_display: true, //Show how many times times review upvoted
              enable_report: true, //Show report button
              enable_date: true, //Show when review was published
          },
      },
  //Translation settings
      translations: {
          'Verified Customer': 'Comprador Verificado'
      },
  //Style settings:
      styles: {
          //Base font size is a reference size for all text elements. When base value gets changed, all TextHeading and TexBody elements get proportionally adjusted.
          '--base-font-size': '16px',
          //Button styles (shared between buttons):
          //'--common-button-font-family': 'Girloy-Regular',
          '--common-button-font-size':'14px',
          '--common-button-font-weight':'400',
          '--common-button-letter-spacing':'0.3',
          '--common-button-text-transform':'uppercase',
          '--common-button-vertical-padding':'10px',
          '--common-button-horizontal-padding':'20px',
          '--common-button-border-width':'2px',
          '--common-button-border-radius':'5',
          //Primary button styles:
          '--primary-button-bg-color': '#F5A203',
          '--primary-button-border-color': '#FAFAFA',
          '--primary-button-text-color': '#FAFAFA',
          //Secondary button styles:
          '--secondary-button-bg-color': 'transparent',
          '--secondary-button-border-color': '#F5A203',
          '--secondary-button-text-color': '#FAFAFA',
          //Star styles:
          '--common-star-color': '#5700AA',
          '--common-star-disabled-color': 'rgba(0,0,0,0.25)',
          '--medium-star-size': '30',
          '--small-star-size': '20',
          //Heading styles:
          '--heading-text-color': '#303030',
          '--heading-text-font-weight': '800',
          //'--heading-text-font-family': 'Girloy-Medium',
          '--heading-text-line-height': '1.5',
          '--heading-text-letter-spacing': '0.5px',
          '--heading-text-transform': 'uppercase',
          //Body text styles:
          '--body-text-color': '#303030',
          '--body-text-font-weight': '400',
          //'--body-text-font-family': 'Girloy-Regular',
          '--body-text-line-height': '1.4',
          '--body-text-letter-spacing': '0.3px',
          '--body-text-transform': 'none',
          //Input field styles:
          //'--inputfield-text-font-family': 'Girloy-Regular',
          '--input-text-font-size': '18',
          '--inputfield-text-font-weight': '400',
          '--inputfield-text-color': '#999999',
          '--inputfield-border-color': 'rgba(0,0,0,0.2)',
          '--inputfield-background-color': 'transparent',
          '--inputfield-border-width': '1px',
          '--inputfield-border-radius': '0px',
          '--common-border-color': 'rgba(0,0,0,0.15)',
          '--common-border-width': '1px',
          '--common-sidebar-width': '260px',
          //Slider indicator (for attributes) styles:
          '--slider-indicator-bg-color': '#F5A203',
          '--slider-indicator-button-color': '#5700AA',
          '--slider-indicator-width': '260px',
          //Badge styles:
          '--badge-icon-color': '#F5A203',
          '--badge-icon-font-size': 'inherit',
          '--badge-text-color': '#F5A203',
          '--badge-text-font-size': '10',
          '--badge-text-letter-spacing': '0.3',
          '--badge-text-transform': 'uppercase',
          //Author styles:
          '--author-font-size': '18',
          '--author-text-transform': 'capitalize',
          //Author avatar styles:
          '--avatar-thumbnail-size': '50px',
          '--avatar-thumbnail-border-radius': '100px',
          '--avatar-thumbnail-text-color': '#FAFAFA',
          '--avatar-thumbnail-bg-color': '#F5A203',
          //Product photo or review photo styles:
          '--photo-video-thumbnail-size': '80px',
          '--photo-video-thumbnail-border-radius': '0px',
          //Media (photo & video) slider styles:
          '--mediaslider-scroll-button-icon-color': '#303030',
          '--mediaslider-scroll-button-bg-color': '#F5A203',
          '--mediaslider-overlay-text-color': '#FAFAFA',
          '--mediaslider-overlay-bg-color': '#F5A20399)',
          '--mediaslider-item-size': '110px',
          //Pagination & tabs styles (normal):
          '--pagination-tab-text-color': '#303030',
          '--pagination-tab-text-transform': 'none',
          '--pagination-tab-text-letter-spacing': '0',
          '--pagination-tab-text-font-size': '16px',
          '--pagination-tab-text-font-weight': '600',
          //Pagination & tabs styles (active):
          '--pagination-tab-active-text-color': '#F5A203',
          '--pagination-tab-active-text-font-weight': '500',
          '--pagination-tab-active-border-color': '#F5A203',
          '--pagination-tab-border-width': '3px',
  
          /*Badge styles:*/
          '--badge-icon-color':'#F5A203',
          '--badge-icon-font-size':'20',
          '--badge-text-color':'#F5A203',
          '--badge-text-font-size':'10',
          '--badge-text-letter-spacing':'0.2',
          '--badge-text-transform':'uppercase',
          /*Author styles:*/
          '--author-font-size':'20',
          '--author-font-weight':'800',
          '--author-text-transform':'capitalize',
          /*Product photo or review photo styles:*/
          '--photo-video-thumbnail-size':'60',
          '--photo-video-thumbnail-border-radius':'10',
          /*Popup styles:*/
          '--popup-backdrop-color':'#3030307D',
          '--popup-color':'#FAFAFA',
          '--popup-star-color':'5700aa',
          '--popup-disabled-star-color':'inherit',
          '--popup-heading-text-color':'303030',
          '--popup-body-text-color':'303030',
          '--popup-badge-icon-color':'inherit',
          '--popup-badge-icon-font-size':'19px',
          '--popup-badge-text-color':'inherit',
          '--popup-badge-text-font-size':'14px',
          '--popup-border-width':'0px',
          '--popup-border-color':'rgba(0,0,0,0.1)',
          '--popup-border-radius':'25',
          '--popup-shadow-size':'10',
          '--popup-shadow-color':'#00000026',
          '--popup-icon-color':'#5700AA',
          /*Tooltip styles:*/
          '--tooltip-bg-color':'#0E1311',
          '--tooltip-text-color':'#FFFFFF'
      },
  });
  `,
    },
  ];
  export default ScriptReviews;
  