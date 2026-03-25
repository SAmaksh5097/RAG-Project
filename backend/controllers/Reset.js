async function Reset(req,res,collection){
    try{
    const count = await collection.countDocuments();
    console.log("before deletion " +count);
    
    const result = await collection.deleteMany({});
    console.log("Documents Deleted are "+result.deletedCount);
    
    return res.status(200).json({message: "Knowledge base reset successful!"});
  } catch(error){
    return res.status(500).json({error: "Failed to reset knowledge base."});
  }
}

export default Reset;