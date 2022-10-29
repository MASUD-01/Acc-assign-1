const express = require('express');
const router = express.Router()
const toolsController = require('../../controller/tools.controller');


// router.get("/", (req, res) => {
//     res.send("tools")
// })
// router.post("/", (req, res) => {
//     res.send("post tools")
// })

//shortCut
router
    .route("/")
    /** documentation or use sogger
     * @api {get} /tools all tools
     * @apiDescription get all the tools
     * @apiPermission admin
     * @apiHeader {string} Authorization users acccess token
     * @apiParam {Number{1-}} [page=1] List Page
     * @apiParam {Number{1-100}} [limit=10] users per page
     * @apiisSuccess {object[]} all the tools
     * @apiError {unathorisze 401} unathorize only authorize users can access the data
     * @apiError (forbidden 403) forbidden only admin can acccess the data
     */
    .get(toolsController.getAllTools)

    /**
    * @api {get} /tools all tools
    * @apiDescription get all the tools
    * @apiPermission admin
    * @apiHeader {string} Authorization users acccess token
    * @apiParam {Number{1-}} [page=1] List Page
    * @apiParam {Number{1-100}} [limit=10] users per page
    * @apiisSuccess {object[]} all the tools
    * @apiError {unathorisze 401} unathorize only authorize users can access the data
    * @apiError (forbidden 403) forbidden only admin can acccess the data
    */
    .post(toolsController.saveAllTool)

router.route("/:id").get(toolsController.getToolDetail)
module.exports = router;