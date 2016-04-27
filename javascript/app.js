angular.module("app", []);

angular.module("app").controller("main", ["$scope", "$http", function ($scope, $http) {
    $scope.newCompany = {};

    $scope.companiesList = [];
    $scope.companiesTree = [];

    $scope.addCompany = function () {
        var data = angular.copy($scope.newCompany);

        data.id_parent = data.parent ? data.parent.id : 0;

        delete data.parent;

        $http.post("api/companies.php", {
            data: data
        }).then(function (response) {
            if (response.data.status) {
                $scope.companiesTree = response.data.companies;
                $scope.redrawCompanies();
            }
        });
    };

    $scope.removeCompany = function (company) {
        $http.delete("api/companies.php?id=" + company.id).then(function (response) {
            if (response.data.status) {
                $scope.companiesTree = response.data.companies;
                $scope.redrawCompanies();
            }
        });
    };

    $scope.saveCompany = function (company) {
        var id = company.id;
        var data = angular.copy(company);

        delete data.total;
        delete data.depth;
        delete data.children;

        $http.post("api/companies.php?id=" + id, {
            data: data
        }).then(function (response) {
            if (response.data.status) {
                $scope.companiesTree = response.data.companies;
                $scope.redrawCompanies();
            }
        });
    };

    $scope.redrawCompanies = function () {
        $scope.newCompany = {};

        $scope.companiesList = [];

        eachCompanies($scope.companiesTree, function (company, depth) {
            company.total = sumCompanies(company);
            company.depth = new Array(depth + 1).join("--");

            $scope.companiesList.push(company);
        });
    };

    $http.get("api/companies.php").then(function (response) {
        if (response.data.status) {
            $scope.companiesTree = response.data.companies;
            $scope.redrawCompanies();
        }
    });

    function sumCompanies(company, total) {
        total = total || 0;
        total += parseInt(company.earnings);

        for (var i = 0; i < company.children.length; i++) {
            total = sumCompanies(company.children[i], total);
        }

        return total;
    }

    function eachCompanies(companies, callback, depth) {
        depth = depth || 0;

        for (var i = 0; i < companies.length; i++) {
            callback(companies[i], depth);

            if (companies[i].children.length) {
                eachCompanies(companies[i].children, callback, depth + 1);
            }
        }
    }
}]);
