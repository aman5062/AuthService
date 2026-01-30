const getPagination = (page,limit)=>{
      const currentPage = page?parseInt(page):1;
      const pageSize = limit?parseInt(limit):10;

      const offset = (currentPage-1)*pageSize;
      return{
            limit:pageSize,
            offset,
            currentPage
      }

}
module.exports = getPagination;