angular.module('Directives', [])
  .directive('dlSearchMember', [function() {
    return {
      restrict: 'A',
      templateUrl: '/directives/searchMember.html',
      controller: function($scope, $rootScope, $state, SendRequest) {
        var congressNumber = '113';
        var house = 'house';
        var api_key = 'dab50f4c71783810c9a7c1f132ef3136:5:73959417';
        $rootScope.getAPIVotes = function(id) {
          var url = '//api.nytimes.com/svc/politics/v3/us/legislative/congress/members/' + id + '/votes.json?api-key=' + api_key;
          SendRequest.getRequest(url)
          .success(function(data) {
            localStorage.setItem('currMemberVotes', JSON.stringify(data.results[0]));
            $state.go('results');
          });
        };

        $rootScope.getMemberAndVotes = function(name) {
          var url = 'api/getOneMember/'+name;
          SendRequest.getRequest(url)
          .success(function(data) {
            console.log(data.member, ' in the getmembers and votes');
            if(localStorage.getItem('loginKey')){
              updateSearchCache({_id: localStorage.getItem('loginKey'), search: {name: name, id: data.member.id}});
            }
            localStorage.setItem('memberData', JSON.stringify(data));
            $rootScope.getAPIVotes(data.member.id);
          })
          .error(function(err) {
            console.log(err);
          });
        };
        var updateSearchCache = function(info){
          console.log('in update search cache before request');
          SendRequest.postRequest('/api/user/cacheSearch', info)
          .success(function(data){
            console.log(data, ' in update search cache after request');
            localStorage.setItem('searchCache', JSON.stringify(data));
          });
        };
      }
    };
  }]);