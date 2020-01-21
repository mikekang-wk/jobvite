function wk_adjustJobsPage() {
    'use strict';

    var jobsPage = document.querySelector('body.jv-page-jobs');

    if (!jobsPage) {
        return;
    }

    var adjustLinks = (function(){
        var jobsPageAnchors = jobsPage.querySelectorAll('a');

        if (jobsPageAnchors.length < 1) {
            return;
        }

        var makeActionLinkModule = (function(){
            var pageBody = jobsPage.querySelector('.jv-page-body');
            var jvWrapper = document.createElement('div');
            var actionLinksModule = document.createElement('div');

            pageBody.appendChild(jvWrapper);

            jvWrapper.classList.add('jv-wrapper');

            actionLinksModule.classList.add('action-links-module');

            if (pageBody) {
                pageBody.parentNode.insertBefore(
                    actionLinksModule,
                    pageBody
                );
            }

            return {
                actionLinksModule: actionLinksModule,
            };
        })();

        function isShowMoreLink(str) {
            var regex = RegExp('search?', 'ig');

            return regex.test(str);
        }

        function isLoginLink(str) {
            var regex = RegExp('login', 'ig');

            return regex.test(str);
        }

        function isJobAlertsLink(str) {
            var regex = RegExp('jobAlerts', 'ig');

            return regex.test(str);
        }

        for (var i = 0; i < jobsPageAnchors.length; i += 1) {
            // avoid loop closure issues
            (function(index){
                var item = jobsPageAnchors[index];
                var href = item.getAttribute('href');

                if (isLoginLink(href)) {
                    item.classList.add('btn');
                    item.classList.add('btn-primary');

                    makeActionLinkModule.actionLinksModule
                        .appendChild(item);
                }

                if (isJobAlertsLink(href)) {
                    item.classList.add('btn');
                    item.classList.add('btn-tertiary');

                    makeActionLinkModule.actionLinksModule
                        .appendChild(item);
                }

                if (isShowMoreLink(href)) {
                    item.parentElement.classList.add('text-center');
                }
            })(i);
        }
    })();
}

window.addEventListener('DOMContentLoaded', function(e) {
  wk_adjustJobsPage();
});
