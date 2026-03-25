async function Reset(req, res, collection) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Only delete documents for this specific user
    const before = await collection.countDocuments({ userId: userId });
    console.log('before deletion ' + before);

    const result = await collection.deleteMany({ userId: userId });
    console.log('Documents deleted: ' + result.deletedCount);

    return res.status(200).json({ message: 'Knowledge base reset successful!' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to reset knowledge base.' });
  }
}

export default Reset;