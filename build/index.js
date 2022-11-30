!function(){"use strict";var e,n={137:function(){var e=window.wp.blocks,n=window.wp.element,t=window.wp.components,a=window.wp.blockEditor,l=JSON.parse('{"u2":"planet4-gpch-tamaro/tamaro-widget"}');(0,e.registerBlockType)(l.u2,{edit:function(e){let{attributes:l,setAttributes:o}=e;return(0,n.createElement)("div",(0,a.useBlockProps)(),(0,n.createElement)(t.CheckboxControl,{label:"Debug",checked:l.debug,onChange:e=>o({debug:e})}),(0,n.createElement)(t.CheckboxControl,{label:"Test Mode",checked:l.testMode,onChange:e=>o({testMode:e})}),(0,n.createElement)("br",null),(0,n.createElement)(t.SelectControl,{label:"Language",value:l.language,options:[{label:"Select an option ...",value:"",disabled:!1},{label:"German",value:"de"},{label:"French",value:"fr"},{label:"Italian",value:"it"}],onChange:e=>o({language:e})}),(0,n.createElement)(t.SelectControl,{label:"Default Payment Type",value:l.defaultPaymentType,options:[{label:"Select an option ...",value:"",disabled:!1},{label:"Onetime",value:"onetime"},{label:"Recurring",value:"recurring"}],onChange:e=>o({defaultPaymentType:e})}),(0,n.createElement)(t.SelectControl,{label:"Default Recurring Interval",value:l.defaultRecurringInterval,options:[{label:"Select an option ...",value:"",disabled:!1},{label:"Monthly",value:"monthly"},{label:"Quarterly",value:"quarterly"},{label:"Semestral",value:"semestral"},{label:"Yearly",value:"yearly"}],onChange:e=>o({defaultRecurringInterval:e})}),(0,n.createElement)(t.TextControl,{label:"Minimum Custom Amount Onetime",value:l.minimumCustomAmountOnetime,onChange:e=>o({minimumCustomAmountOnetime:parseInt(e)}),help:"Minimum custom amount which can be set on the form for onetime donations."}),(0,n.createElement)(t.TextControl,{label:"Amounts Onetime",value:l.amountsOnetime,onChange:e=>o({amountsOnetime:e}),help:"Predefined amounts which appear on the form for onetime donations (comma separated list, example: 39,84,150,250)."}),(0,n.createElement)(t.TextControl,{label:"Minimum Custom Amount Recurring (monthly)",value:l.minimumCustomAmountRecurringMonthly,onChange:e=>o({minimumCustomAmountRecurringMonthly:parseInt(e)}),help:"Minimum custom amount which can be set on the form for monthly recurring donations."}),(0,n.createElement)(t.TextControl,{label:"Amounts Recurring (monthly)",value:l.amountsRecurringMonthly,onChange:e=>o({amountsRecurringMonthly:e}),help:"Predefined amounts which appear on the form for monthly recurring donations (comma separated list, example: 7,10,20,50)."}),(0,n.createElement)(t.TextControl,{label:"Salesforce Campaign ID",value:l.salesforceCampaignID,onChange:e=>o({salesforceCampaignID:e})}),(0,n.createElement)(t.SelectControl,{label:"Salesforce Product",value:l.salesforceProduct,options:[{label:"Select an option ...",value:"",disabled:!1},{label:"Standard Donation",value:"Standard Donation"},{label:"Sponsorship Agriculture",value:"Sponsorship Agriculture"},{label:"Sponsorship Climate",value:"Sponsorship Climate"},{label:"Sponsorship Fleet",value:"Sponsorship Fleet"},{label:"Sponsorship Forest",value:"Sponsorship Forest"},{label:"Sponsorship Ocean",value:"Sponsorship Ocean"}],onChange:e=>o({salesforceProduct:e})}))}})}},t={};function a(e){var l=t[e];if(void 0!==l)return l.exports;var o=t[e]={exports:{}};return n[e](o,o.exports,a),o.exports}a.m=n,e=[],a.O=function(n,t,l,o){if(!t){var r=1/0;for(s=0;s<e.length;s++){t=e[s][0],l=e[s][1],o=e[s][2];for(var u=!0,i=0;i<t.length;i++)(!1&o||r>=o)&&Object.keys(a.O).every((function(e){return a.O[e](t[i])}))?t.splice(i--,1):(u=!1,o<r&&(r=o));if(u){e.splice(s--,1);var m=l();void 0!==m&&(n=m)}}return n}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[t,l,o]},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e={826:0,431:0};a.O.j=function(n){return 0===e[n]};var n=function(n,t){var l,o,r=t[0],u=t[1],i=t[2],m=0;if(r.some((function(n){return 0!==e[n]}))){for(l in u)a.o(u,l)&&(a.m[l]=u[l]);if(i)var s=i(a)}for(n&&n(t);m<r.length;m++)o=r[m],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(s)},t=self.webpackChunkplanet4_gpch_tamaro=self.webpackChunkplanet4_gpch_tamaro||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var l=a.O(void 0,[431],(function(){return a(137)}));l=a.O(l)}();