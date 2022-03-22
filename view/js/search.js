/* --- Search --- */

function searchfocus(){
    var searchtext = document.getElementById('searchtext');
    var result = document.getElementById('result');
    searchtext.focus();

    if (searchtext.value != '')
        result.style.display = 'block';
}
async function search(id){
    var result = document.getElementById('result');
    result.style.display = 'block';

    const alltype = ['csv', 'doc', 'docx', 'file', 'folder', 'gif', 'ico', 'jpg', 'mov', 'mp3', 'mp4', 'odt', 'pdf', 'png', 'pptx', 'xls', 'xlsx', 'zip']

    var url = IP + '?ctrl=search&q=' + id.value;
    let response = await fetch(url);	
	if (response.status === 200) {
		let data = await response.json();

        var echo = '';

        for(var i = 0; i < data.length; i++){
            var name = data[i].substring(data[i].lastIndexOf('/') + 1);
            var type = data[i].substring(data[i].lastIndexOf('.') + 1);
            var path = data[i].substring(0, data[i].lastIndexOf('/'));

            if (type == 'dir'){
                type = 'folder';
                name = name.substring(0, name.length - 4);
                path += '/' + name;
            }

            if (alltype.indexOf(type) == -1)
                type = 'file';

            echo += '<tr onclick="change_path(\'' + path + '\');"><td><img src="' + IP + '/view/type/' + type + '.png"></td><td>' + name + '</td></tr>';

            if (i == 100)
                break;
        }
    }

    result.innerHTML = echo;
}
function hide_search(){
    var result = document.getElementById('result');
    result.style.display = 'none';
}